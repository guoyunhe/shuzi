# Chinese Number Format | 中文数字格式

- Similar API to [Intl.NumberFormat] | 采用了与 [Intl.NumberFormat] 类似的接口实现
- Support four writting scripts | 支持四种书写格式:
  - `zh-CN-small` (简体小写)
  - `zh-CN-big` (简体大写)
  - `zh-TW-small` (繁体小写)
  - `zh-TW-big` (繁体大写)

## Install | 安装

```bash
npm  i -S shuzi
```

## Example | 示例

### Chinese small script number | 中文小写数字

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-small').format(12345.67); // 一万二千三百四十五点六七
```

### Chinese small script currency | 中文小写金额

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-small', { style: 'currency' }).format(12345.67); // 一万二千三百四十五元六角七分
```

### Chinese big script number | 中文大写数字

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-big').format(12345.67); // 壹万贰仟叁佰肆拾伍点陆柒
```

### Chinese big script currency | 中文大写金额

```js
import { NumberFormat } from 'shuzi';

new NumberFormat('zh-CN-big', { style: 'currency' }).format(12345.67); // 壹万贰仟叁佰肆拾伍圆陆角柒分
```

## Acknowledge | 致谢

This project is based on the following open-source projects | 本项目基于以下开源项目：

- [nzh](https://github.com/cnwhy/nzh) by [cnwhy](https://github.com/cnwhy)
- [number2chinesenumber](https://github.com/wansongtao/chinese-number) by [wansongtao](https://github.com/wansongtao)

[Intl.NumberFormat]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
