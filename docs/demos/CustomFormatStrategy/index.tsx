import React from 'react';

import { IValue, IOption, IParse, ICalc } from 'anf/dist/esm/typings';
import anf, { StrategyManager, AbstractFormatStrategy, Helpers } from 'anf';

/**
 * 实现自定义策略
 * 
 * @description 将后缀转为 💰
 * @param name {string} - 策略名
 */
const MyStrategy = class extends AbstractFormatStrategy {
  constructor(name: string) {
    super(name);
  }

  // calc 是抽象方法，要自己实现。接受4个参数，入参值、配置项、 解析值、计算值
  format(value: IValue, option: IOption, parse: IParse, calc: ICalc): string {
    const {
      $sign,
      $value,
      $suffix
    } = calc;

    return `${$sign}${$value}💰`;
  }
}

// 注册
StrategyManager.register(new MyStrategy('my'));

// 使用
export default () => (<h1>{anf({ formatStrategy: 'my' }, 1234)}</h1>);