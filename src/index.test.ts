import { shuzi } from '.';

describe('shuzi', () => {
  it('normal', async () => {
    expect(shuzi('Foo', 'Bar')).toBe('Foo Bar');
  });

  it('lastName upper case', async () => {
    expect(shuzi('Foo', 'Bar', { lastNameUpperCase: true })).toBe('Foo BAR');
  });
});
