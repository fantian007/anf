---
title: 后缀空格
order: 4
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

anf('123.45px'); // 123.45px

anf('123.45 px'); // 123.45 px

anf({ space: true }, '123.45px'); // 123.45 px

anf({ space: false }, '123.46 px'); // 123.45px
```


### 特性
- 默认会保留数值和后缀之间的空格
- 如设置 `space`, 则会按 space 处理