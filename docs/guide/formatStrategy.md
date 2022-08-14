---
title: 输出策略
order: 9
nav:
  path: /anf/docs/guide
  title: 文档
  order: 1
group:
  path: /anf/docs/guide/props
  title: 配置项
  order: 2
---

### 输出策略
决定如何由配置项 和 计算策略结果 组合
- 符号
- 数值
- 后缀

### 使用
```javascript
import anf from '@sprit/anf';

anf({ formatStrategy: 'default' }, 12345.67); // 1.23万
```

### 特性
- 内置 1 中默认的输出策略 `default`
- 对于不满足的自定义格式化需求，可以通过自定义扩展策略来实现
