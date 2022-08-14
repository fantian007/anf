---
title: 科学计数法
order: 7
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
支持科学计数法的格式化

```javascript
import anf from '@sprit/anf';

anf('1e3'); // 1,000

anf('1e+3'); // 1,000

anf('1e-3'); // 0

anf({ precision: 5 }, '1e-3'); // 0.001

anf({ precision: 5, trimTailZero: false }, '1e-3'); // 0.00100
```

### 特性
- 可将科学计算法形式展开，进行格式化
