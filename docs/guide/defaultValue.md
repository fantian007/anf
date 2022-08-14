---
title: 默认值
order: 0
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
import anf from '@sprit/anf';

anf(); // -

anf(undefined); // -

anf(null); // -

anf(''); // -

anf({ defaultValue: 0 }, '') // 0
```

### 特性
- `'' | undefined | null` 默认会展示为 `-`, 可以指定 defaultValue 来展示默认输出
