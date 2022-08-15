---
title: 后缀
order: 3
nav:
  path: /docs/guide
  title: 文档
  order: 1
group:
  path: /docs/guide/props
  title: 配置项
  order: 2
---

### 使用
```javascript
import anf from '@sprit/anf';

anf('12345.67px'); // 12,345.67px

anf('123.45$'); // 123.45$

anf('12345.678元'); // 12,345.68元

anf('12345.678    日元'); // 12,345.68 日元

anf({ suffix: '日元' }, '12345.678 元'); // 12,345.68日元

anf('12345.678'); // 1.23万， zh_CN 策略（默认）会自动进行 万/亿 转换

anf({ suffix: '' }, 12345.678); // 12,345.68

anf({ suffix: '%' }, 12345.678); // 12,345.68%
```

### 特性
- 数值部分进行格式化，后缀会保留
- 如数值和后缀之间有多个空格，会处理为 1个 空格
- 可以指定 `suffix: xxx` 进行后缀替换
- zh_CN(默认) 策略下，不想自动进行 万/亿 转换，可以设置 `suffix: ''`
