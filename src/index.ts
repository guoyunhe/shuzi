export interface NumberFormatOptions {
  /**
   * @default 'number'
   */
  style?: 'number' | 'currency';
}

const SCRIPTS: Record<Locale, string> = {
  'zh-CN-small': '零一二三四五六七八九十百千万亿点负元角分厘毫',
  'zh-CN-big': '零壹贰叁肆伍陆柒捌玖拾佰仟万亿点负元角分厘毫',
  'zh-TW-small': '零一二三四五六七八九十百千万亿点负元角分厘毫',
  'zh-TW-big': '零壹贰叁肆伍陆柒捌玖拾佰仟万亿点负元角分厘毫',
};

export type Locale = 'zh-CN-small' | 'zh-CN-big' | 'zh-TW-small' | 'zh-TW-big';

export class NumberFormat {
  private script: string;

  constructor(
    private locale: Locale,
    private options?: NumberFormatOptions,
  ) {
    this.script = SCRIPTS[locale];
  }

  format(value: number | string): string {
    if (!this._validate(value)) {
      return 'InvalidNumber';
    }

    const num = Number(value);
    const [significant, fragment] = String(Math.abs(num)).split('.');

    let output = this._formatSignificant(significant);

    if (this.options?.style === 'currency') {
      // 「元」
      output += this.script[17];
      if (fragment) {
        output += this._formatFragmentCurrency(fragment);
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
      switch (i) {
        // 「万」
        case 3:
        case 1:
          output = this.script[13] + output;
          break;
        // 「亿」
        case 2:
          output = this.script[14] + output;
          break;
        default:
          break;
      }

      output =
        this._formatSignificantGroup(
          value.substring(value.length - (i + 1) * 4, value.length - i * 4),
        ) + output;
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
      output += this.script[Number(value[i])];
    }
    return output;
  }

  /**
   * 金额小数部分格式化
   */
  private _formatFragmentCurrency(value: string) {
    let output = '';
    for (let i = 0; i < value.length; i++) {
      output += this.script[Number(value[i])] + this.script[18 + i];
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
