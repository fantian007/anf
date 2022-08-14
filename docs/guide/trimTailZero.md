---
title: 尾部 0
order: 2
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
import anf from 'anf';

anf('123.40'); // 123.4
anf({ trimTailZero: true }, '123.40'); // 123.4
anf({ trimTailZero: false }, '123.40'); // 123.40

anf('123.406'); // 123.41
```


### 特性
- 尾部有 0 元素，默认去除
- 如想保留 0， 设置 `trimTailZero: false`
