export interface NumberFormatOptions {
  /**
   * @default 'decimal'
   */
  style?: 'decimal' | 'currency';
  /**
   * The maximum number of fraction digits to use. The default for plain number formatting is 3 and
   * possible values from 0 to 100. The default for currency formatting is 2 and possible values
   * from 0 to 4.
   *
   * 最大小数位长度。普通数字默认值为 3，取值范围 0-100。货币金额默认值为 2，取值范围 0-4。
   */
  maximumFractionDigits?: number;
}

const SCRIPTS: Record<Locale, string> = {
  'zh-CN-small': '零一二三四五六七八九十百千万亿点负元整角分厘毫',
  'zh-CN-big': '零壹贰叁肆伍陆柒捌玖拾佰仟万亿点负元整角分厘毫',
  'zh-HK-small': '零一二三四五六七八九十百千萬億點負元整角分厘毫',
  'zh-HK-big': '零壹貳參肆伍陸柒捌玖拾佰仟萬億點負圓整角分厘毫',
  'zh-TW-small': '零一二三四五六七八九十百千萬億點負元整角分厘毫',
  'zh-TW-big': '零壹貳參肆伍陸柒捌玖拾佰仟萬億點負圓整角分厘毫',
};

export type Locale =
  | 'zh-CN-small'
  | 'zh-CN-big'
  | 'zh-HK-small'
  | 'zh-HK-big'
  | 'zh-TW-small'
  | 'zh-TW-big';

export class NumberFormat {
  private script: string;
  private intl: Intl.NumberFormat;

  constructor(
    private locale: Locale,
    private options?: NumberFormatOptions,
  ) {
    this.script = SCRIPTS[locale];
    this.intl = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits:
        options?.maximumFractionDigits || (options?.style === 'currency' ? 2 : 3),
      useGrouping: false,
    });
  }

  format(value: number | string): string {
    if (!this._validate(value)) {
      return 'InvalidNumber';
    }

    const num = Number(value);
    const [significant, fragment] = this.intl.format(Math.abs(num)).split('.');

    let output = this._formatSignificant(significant);

    if (this.options?.style === 'currency') {
      if (significant === '0' && fragment) {
        // 大于零元，小于一元的情况
        output = '';
      } else {
        // 「元」
        output += this.script[17];
      }
      if (fragment) {
        // 「角、分、厘、毫」
        output += this._formatFragmentCurrency(fragment, significant);
      } else {
        // 「整」
        output += this.script[18];
      }
    } else if (fragment) {
      // 「点」
      output += this.script[15] + this._formatFragment(fragment);
    }

    // 「负」
    if (num < 0) {
      output = this.script[16] + output;
    }

    return output;
  }

  /**
   * 整数部分格式化
   */
  private _formatSignificant(value: string) {
    // 「零」简化处理
    if (value === '0') {
      return this.script[0];
    }

    // 四位以内简化处理
    if (value.length <= 4) {
      return this._formatSignificantGroup(value);
    }

    let output = '';
    for (let i = 0; i < value.length / 4; i++) {
      const group = this._formatSignificantGroup(
        value.substring(value.length - (i + 1) * 4, value.length - i * 4),
      );

      if (group) {
        // 添加「万、亿」后缀
        switch (i) {
          // 「万」
          case 3:
          case 1:
            output = group + this.script[13] + output;
            break;
          // 「亿」
          case 2:
            output = group + this.script[14] + output;
            break;
          default:
            output = group + output;
        }
      }
    }

    return output;
  }

  /**
   * 整数部分四位一组格式化
   */
  private _formatSignificantGroup(value: string) {
    let output = '';
    for (let i = 0; i < value.length; i++) {
      const digit = Number(value[value.length - 1 - i]);

      // 合并连续的「零」，移除末尾的「零」
      if (digit === 0 && (!output || output[0] === this.script[0])) {
        continue;
      }

      // 「十、百、千」
      if (i > 0 && digit !== 0) {
        output = this.script[i + 9] + output;
      }

      output = this.script[digit] + output;
    }
    return output;
  }

  /**
   * 小数部分格式化
   */
  private _formatFragment(value: string) {
    let output = '';
    for (let i = 0; i < value.length; i++) {
      const digit = Number(value[i]);
      output += this.script[digit];
    }
    return output;
  }

  /**
   * 金额小数部分格式化
   */
  private _formatFragmentCurrency(value: string, significant: string) {
    let output = '';
    for (let i = 0; i < value.length; i++) {
      const digit = Number(value[i]);
      if (digit === 0) {
        // 合并连续的「零」，移除开头的「零」
        if (output.endsWith(this.script[0]) || (significant === '0' && !output)) {
          continue;
        }
        output += this.script[0];
      } else {
        output += this.script[digit] + this.script[19 + i];
      }
    }
    return output;
  }

  /**
   * 校验数字是否有效
   */
  private _validate(value: string | number) {
    const num = Number(value);
    return !Number.isNaN(num) && Number.isFinite(num);
  }
}
