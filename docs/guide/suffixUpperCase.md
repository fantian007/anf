---
title: 后缀大写
order: 5
nav:
  path: /anf/docs/guide
  title: 文档
  order: 1
group:
  path: /anf/docs/guide/props
  title: 配置项
  order: 2
---

### 使用
```javascript
import anf from 'anf';

anf('12345.67px'); // 12,345.67PX
```

### 特性
- 对后缀使用 `toLocaleUpperCase()` 大写处理
