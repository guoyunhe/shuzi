# Chinese Number Format | 中文数字格式

## Install | 安装

```bash
npm  i -S shuzi
```

## Example | 示例

### Chinese small script number | 简体中文小写数字

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-small').format(12345.67);
// 一万二千三百四十五点六七
```

### Chinese small script currency | 简体中文小写金额

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-small', { style: 'currency' }).format(12345.67);
// 一万二千三百四十五元六角七分
```

### Chinese big script number | 简体中文大写数字

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-big').format(12345.67);
// 壹万贰仟叁佰肆拾伍点陆柒
```

### Chinese big script currency | 简体中文大写金额

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-big', { style: 'currency' }).format(12345.67);
// 壹万贰仟叁佰肆拾伍圆陆角柒分
```

## API | 接口

Similar API to [Intl.NumberFormat] | 采用了与 [Intl.NumberFormat] 类似的接口实现

```ts
NumberFormat(locale, options);
```

### locale

- Support six writting scripts | 支持六种书写格式:
  - `zh-CN-small` (简体小写)
  - `zh-CN-big` (简体大写)
  - `zh-TW-small` (香港繁体小写)
  - `zh-TW-big` (香港繁体大写)
  - `zh-TW-small` (台湾繁体小写)
  - `zh-TW-big` (台湾繁体大写)

### options.style

`decimal` or `currency`

### options.maximumFractionDigits

The maximum number of fraction digits to use. The default for plain number formatting is 3 and
possible values from 0 to 100. The default for currency formatting is 2 and possible values from 0
to 4.

最大小数位长度。普通数字默认值为 3，取值范围 0-100。货币金额默认值为 2，取值范围 0-4。

## FAQ | 常见问题

### Why not Intl.NumberFormat? | 为什么不用 Intl.NumberFormat?

[Intl.NumberFormat] can only replace 0-9 with 〇-九, different from Chinese decimal used in financial
systems. | [Intl.NumberFormat] 只能简单地将 0-9 替换成 〇-九，和金融系统中使用的中文十进制有很大区别。

```js
new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(123456.789);
// 一二三,四五六.七八九

new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec', { style: 'currency', currency: 'CNY' }).format(
  123456.789,
);
// ¥一二三,四五六.七九
```

## Acknowledge | 致谢

This project is based on the following open-source projects | 本项目基于以下开源项目：

- [nzh](https://github.com/cnwhy/nzh) by [@cnwhy](https://github.com/cnwhy)
- [number2chinesenumber](https://github.com/wansongtao/chinese-number) by [@wansongtao](https://github.com/wansongtao)

[Intl.NumberFormat]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
