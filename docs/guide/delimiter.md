---
title: 千分位
order: 6
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

anf(12345.67); // 12,345.67

anf({ delimiter: '-' }, 12345.67); // 12-345.67

anf({ delimiter: '' }, 12345.67); // 12345.67
```

### 特性
- 可指定分隔符符号
