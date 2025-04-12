import { NumberFormat } from '.';

describe('NumberFormat', () => {
  describe('zh-CN-small', () => {
    it('format currency', () => {
      expect(new NumberFormat('zh-CN-small', { style: 'currency' }).format(12345.67)).toBe(
        '一万二千三百四十五元六角七分',
      );
    });
  });
});
