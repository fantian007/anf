---
title: 简介
order: 1
nav:
  path: /docs/guide
  title: 文档
  order: 1
group:
  path: /docs/guide/start
  title: 快速开始
  order: 1
---

### 简介
anf.js 提供了简单易用的 API 来处理数值格式化问题

1. 自动换算数值单位
2. 指定精度
3. 千分位
4. 自动去除尾部 0
5. 数值、单位之间 空格处理
6. 无效数值时指定默认值
7. 后缀大小写
8. 支持科学计数法展开
9. 自定义策略
10. 支持类和函数两种方式

### 特性一览
| 属性 | 类型 | 默认 | 必填 | 说明 |
| :-- | :-- | :-- | :-- | :-- |
| precision | number | 2 | 否 | 精度 |
| space | boolean | false | 否 | 数值和后缀之间是否需要空格 |
| trimTailZero | boolean | true | 否 | 是否去除尾部 0 |
| suffix | string | undefined | 否 | 后缀(为 undefined 时，走默认策略 'zh_CN') |
| suffixUpperCase | boolean | false | 否 | 后缀是否大写 |
| calcStrategy | ICalcStrategy | zh_CN | 否 | 计算策略（支持国际化），支持扩展 |
| formatStrategy | IFormatStrategy | default | 否 | 输出策略，默认使用内置的输出策略 |
| delimiter | string | , | 否 | 千分位分隔符 |
| defaultValue | string | - | 否 | 默认值，当计算结果为 null \| undefined \| '' 时，输出默认值 |
