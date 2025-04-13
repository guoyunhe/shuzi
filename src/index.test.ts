import { NumberFormat } from '.';

describe('NumberFormat', () => {
  describe('zh-CN-small', () => {
    describe('number style', () => {
      it('format integer', () => {
        const nm = new NumberFormat('zh-CN-small');

        expect(nm.format(0)).toBe('零');
        expect(nm.format(1)).toBe('一');

        expect(nm.format(10)).toBe('一十');
        expect(nm.format(12)).toBe('一十二');
        expect(nm.format(-12)).toBe('负一十二');

        expect(nm.format(100)).toBe('一百');
        expect(nm.format(103)).toBe('一百零三');
        expect(nm.format(120)).toBe('一百二十');
        expect(nm.format(123)).toBe('一百二十三');

        expect(nm.format(10000)).toBe('一万');
        expect(nm.format(10005)).toBe('一万零五');
        expect(nm.format(10045)).toBe('一万零四十五');
        expect(nm.format(10305)).toBe('一万零三百零五');
        expect(nm.format(12045)).toBe('一万二千零四十五');
        expect(nm.format(12345)).toBe('一万二千三百四十五');
      });

      it('format decimal', () => {
        const nm = new NumberFormat('zh-CN-small');

        expect(nm.format(0.1)).toBe('零点一');
        expect(nm.format(1.2)).toBe('一点二');
        expect(nm.format(1.03)).toBe('一点零三');
        expect(nm.format(-100.2)).toBe('负一百点二');
      });
    });

    describe('currency style', () => {
      it('format integer', () => {
        const nm = new NumberFormat('zh-CN-small', { style: 'currency' });

        expect(nm.format(12345)).toBe('一万二千三百四十五元');
      });
    });
  });
});
