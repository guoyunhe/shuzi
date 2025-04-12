export interface NumberFormatOptions {
  /**
   * @default 'number'
   */
  style?: 'number' | 'currency';
}

export type Locale = 'zh-CN-small' | 'zh-CN-big' | 'zh-TW-small' | 'zh-TW-big';

export class NumberFormat {
  constructor(
    private locale: Locale,
    private options?: NumberFormatOptions,
  ) {}

  format(value: number | string): string {
    console.log(value);
    return '';
  }
}
