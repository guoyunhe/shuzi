import { NumberFormat } from '.';

describe('NumberFormat', () => {
  describe('zh-CN-small', () => {
    describe('number style', () => {
      const nm = new NumberFormat('zh-CN-small');

      it('format integer', () => {
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
        expect(nm.format(0.1)).toBe('零点一');
        expect(nm.format(1.2)).toBe('一点二');
        expect(nm.format(1.03)).toBe('一点零三');
        expect(nm.format(-100.2)).toBe('负一百点二');
      });
    });

    describe('currency style', () => {
      const nm = new NumberFormat('zh-CN-small', { style: 'currency' });

      it('format integer', () => {
        expect(nm.format(0)).toBe('零元整');
        expect(nm.format(12345)).toBe('一万二千三百四十五元整');
      });

      it('format decimal', () => {
        expect(nm.format(0.01)).toBe('一分');
        expect(nm.format(0.1)).toBe('一角');
        expect(nm.format(0.12)).toBe('一角二分');
        expect(nm.format(123.05)).toBe('一百二十三元零五分');
        expect(nm.format(123.45)).toBe('一百二十三元四角五分');
        expect(nm.format(123.4567)).toBe('一百二十三元四角六分');
      });
    });
  });

  describe('zh-CN-big', () => {
    describe('number style', () => {
      const nm = new NumberFormat('zh-CN-big');

      it('format integer', () => {
        expect(nm.format(0)).toBe('零');
        expect(nm.format(1)).toBe('壹');

        expect(nm.format(10)).toBe('壹拾');
        expect(nm.format(12)).toBe('壹拾贰');
        expect(nm.format(-12)).toBe('负壹拾贰');

        expect(nm.format(100)).toBe('壹佰');
        expect(nm.format(103)).toBe('壹佰零叁');
        expect(nm.format(120)).toBe('壹佰贰拾');
        expect(nm.format(123)).toBe('壹佰贰拾叁');

        expect(nm.format(10000)).toBe('壹万');
        expect(nm.format(10005)).toBe('壹万零伍');
        expect(nm.format(10045)).toBe('壹万零肆拾伍');
        expect(nm.format(10305)).toBe('壹万零叁佰零伍');
        expect(nm.format(12045)).toBe('壹万贰仟零肆拾伍');
        expect(nm.format(12345)).toBe('壹万贰仟叁佰肆拾伍');
      });

      it('format decimal', () => {
        expect(nm.format(0.1)).toBe('零点壹');
        expect(nm.format(1.2)).toBe('壹点贰');
        expect(nm.format(1.03)).toBe('壹点零叁');
        expect(nm.format(-100.2)).toBe('负壹佰点贰');
      });
    });

    describe('currency style', () => {
      const nm = new NumberFormat('zh-CN-big', { style: 'currency' });

      it('format integer', () => {
        expect(nm.format(0)).toBe('零元整');
        expect(nm.format(12345)).toBe('壹万贰仟叁佰肆拾伍元整');
        expect(nm.format(300000000)).toBe('叁亿元整');
      });

      it('format decimal', () => {
        expect(nm.format(0.01)).toBe('壹分');
        expect(nm.format(0.1)).toBe('壹角');
        expect(nm.format(0.12)).toBe('壹角贰分');
        expect(nm.format(123.05)).toBe('壹佰贰拾叁元零伍分');
        expect(nm.format(123.45)).toBe('壹佰贰拾叁元肆角伍分');
        expect(nm.format(123.4567)).toBe('壹佰贰拾叁元肆角陆分');
      });
    });
  });
});
