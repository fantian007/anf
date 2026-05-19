<p align="center">
  <a href="https://fantian007.github.io/anf">
    <img width="200" src="./logo.png" alt="anf logo">
  </a>
</p>

<h1 align="center">ANF</h1>

<p align="center">
  <strong>Auto Number Format</strong> — 简单、可扩展的 JavaScript 数值格式化库
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sprit/anf">
    <img src="https://img.shields.io/npm/v/@sprit/anf?color=blue&label=npm" alt="npm version">
  </a>
  <a href="https://github.com/fantian007/anf/pkgs/npm/anf">
    <img src="https://img.shields.io/badge/github-packages-blue?logo=github" alt="GitHub Packages">
  </a>
  <a href="https://fantian007.github.io/anf">
    <img src="https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3%E7%AB%99-brightgreen" alt="docs">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/npm/l/@sprit/anf" alt="license">
  </a>
  <img src="https://img.shields.io/badge/tests-115%20passed-brightgreen" alt="tests">
</p>

---

## 安装

```bash
# npm
npm install @sprit/anf

# GitHub Packages
npm install @fantian007/anf --registry=https://npm.pkg.github.com
```

## 快速开始

```ts
import autoNumberFormat, { AutoNumberFormat } from '@sprit/anf';

// 类方式
new AutoNumberFormat('123456789').format({ calcStrategy: 'en_US', suffixUpperCase: true });
// → '123.46M'

// 函数方式
autoNumberFormat({ calcStrategy: 'zh_CN' }, '123456');
// → '12.35万'

// 柯里化
const fmt = autoNumberFormat({ calcStrategy: 'zh_CN' });
fmt('540453');
// → '54.05万'
```

## 功能

- **精度控制** — `precision` 指定小数位数
- **千分位分隔** — `delimiter` 自定义分隔符，或 `false` 禁用
- **末尾零处理** — `trimTailZero` 自动去除小数末尾的零
- **后缀大小写** — `suffixUpperCase` 控制后缀字母大小写
- **空格** — `space` 数值与后缀间添加空格
- **默认值** — `defaultValue` 空值时的占位输出
- **科学计数法** — 自动展开 `1e+6` → `1000000`
- **后缀检测** — 自动识别 `%`、`px`、`元` 等后缀

### 内置计算策略

| 策略 | 说明 | 示例 |
|------|------|------|
| `zh_CN` | 万 / 亿 | `123456` → `12.35万` |
| `en_US` | K / M / B | `123456789` → `123.46M` |
| `star` | 星级映射 | `12345` → `1.23☆☆☆☆☆` |

### 自定义策略

```ts
import { StrategyManager, AbstractCalcStrategy } from '@sprit/anf';

class MyStrategy extends AbstractCalcStrategy {
  calc(value, option, parse) {
    // 自定义计算逻辑
    return { $sign: '', $value: '...', $suffix: null };
  }
}

StrategyManager.register(new MyStrategy('myStrategy'));
```

## API

### `AutoNumberFormat` 类

```ts
new AutoNumberFormat(value: IValue, option?: IOption).format(overrideOption?: IOption): string
```

### `autoNumberFormat` 函数

```ts
autoNumberFormat(value: IValue): string
autoNumberFormat(option: IOption): (value: IValue, overrideOption?: IOption) => string
autoNumberFormat(option: IOption, value: IValue): string
```

### IOption 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `precision` | `number` | `2` | 小数精度 |
| `trimTailZero` | `boolean` | `true` | 去除末尾零 |
| `delimiter` | `string \| false` | `','` | 千分位分隔符 |
| `suffix` | `string` | — | 自定义后缀 |
| `suffixUpperCase` | `boolean` | `false` | 后缀大写 |
| `space` | `boolean` | `false` | 值与后缀间加空格 |
| `defaultValue` | `string` | `'-'` | 空值占位符 |
| `calcStrategy` | `string` | `'zh_CN'` | 计算策略 |
| `formatStrategy` | `string` | `'default'` | 输出策略 |

## 文档

在线文档 + 交互式测试：**[fantian007.github.io/anf](https://fantian007.github.io/anf)**

## License

MIT © [赵永盛](https://github.com/fantian007)
