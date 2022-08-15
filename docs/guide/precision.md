---
title: 精度
order: 1
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

// 精度为 2
anf({ precision: 2 }, 123.456); // 123.46

anf({ precision: 2 }, 123.45); // 123.45

anf({ precision: 3 }, 123.45); // 123.45

anf({ precision: 3, trimTailZero: false }, 123.45); // 123.450
```


### 特性
- 截取精度时，会自动四舍五入
- 如末尾有 0，会自动舍弃 0 值；如要保留末尾0，请设置 `trimTailZero: false`