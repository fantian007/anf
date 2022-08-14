---
title: 计算策略
order: 8
nav:
  path: /anf/docs/guide
  title: 文档
  order: 1
group:
  path: /anf/docs/guide/props
  title: 配置项
  order: 2
---

### 简介
计算策略，决定如何由配置项 和 输入值解析结果 得出
- 符号
- 数值
- 后缀

### 使用
```javascript
import anf from 'anf';

anf({ calcStrategy: 'zh_CN' }, 12345.67); // 1.23万
anf({ calcStrategy: 'en_US' }, 12345.67); // 12.35K
```


### 特性
- `zh_CN` 是默认策略
- 内置了2种策略 `zh_CN`、`en_US`
- 对于不满足的自定义格式化需求，可以通过自定义扩展策略来实现
