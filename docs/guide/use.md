---
title: 使用
order: 3
nav:
  path: /anf/docs/guide
  title: 文档
  order: 1
group:
  path: /anf/docs/guide/start
  title: 快速开始
  order: 1
---

### 使用方式
提供了 n 种使用方式，可以满足各种场景格式化需求


#### 方式一
```javascript
import anf from 'anf';

const value = anf(123.456);

console.log(value); // 123.46
```
走默认的格式化配置，参考 [默认值](/anf/docs/guide/start/desc)

#### 方式二
```javascript
import anf from 'anf';

const value = anf({ precision: 2 }, 123.456);

console.log(value); // 123.46
```
可以传递配置项，对第二个数值参数进行格式化，只可格式化当前值

#### 方式三
```javascript
import anf from 'anf';

const formatter = anf({ precision: 2, trimTailZero: false });

const value1 = formatter(123.456);
const value2 = formatter(123.4);

console.log(value1); // 123.46
console.log(value2); // 123.40
```
formatter 是一个自定义配置的格式化函数，可以使用一份相同配置，对多个数值进行格式化

### 方式四（类形式）
```javascript
import { AutoNumberFormat } from 'anf';

new AutoNumberFormat('1.100').format() // => 1.1
new AutoNumberFormat('1.100').format({ trimTailZero: false }) // => 1.10
new AutoNumberFormat('1.100', { precision: 2 }).format({ trimTailZero: false }) // => 1.10
```