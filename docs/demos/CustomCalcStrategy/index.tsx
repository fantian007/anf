import React from 'react';
import BN from 'bignumber.js';

import { IValue, IOption, IParse } from 'anf/dist/esm/typings';
import anf, { StrategyManager, AbstractCalcStrategy, Helpers } from 'anf';
const { processPrecision, processTrimNumTailZero, processThousandsSplit, processSuffixUppercase } = Helpers;

/**
 * 实现自定义策略
 * 
 * @description 将数值达到 千 的数值，展示为 0.x 万元
 * @param name {string} - 策略名
 */
const MyStrategy = class extends AbstractCalcStrategy {
  constructor(name: string) {
    super(name);
  }

  // calc 是抽象方法，要自己实现。接受3个参数，入参值，配置项 和 解析值
  calc (value: IValue, option: IOption, parse: IParse) {
    // 传入的配置项
    const {
      precision,
      trimTailZero,
      delimiter,
      suffixUpperCase
    } = option;

    // 内部解析完毕后的值
    const {
      // 符号
      _sign,
      // 整体数值部分
      _value,
      // 整数部分
      _integer,
      // 小数部分
      _decimal,
      // 后缀
      _suffix
    } = parse;

    let $sign = _sign;
    let $value = _value;
    let $suffix = _suffix;

    // 去除 + 号
    $sign = ['+', null].includes(_sign) ? '' : _sign;

    if (_integer.length >= 9) {
      $value = new BN(_value).dividedBy(Math.pow(10, 8)).toString();
      $suffix = '亿元';
    }
    else if (_integer.length >= 5) {
      $value = new BN(_value).dividedBy(Math.pow(10, 4)).toString();
      $suffix = '万元';
    }
    else if (_integer.length >= 4) {
      $value = new BN(_value).dividedBy(Math.pow(10, (_integer.length ))).toString();
      $suffix = '万元';
    }
    else {
      $suffix = '';
    }

    // 精度处理
    $value  = processPrecision($value, precision);
    // 末尾0
    $value  = processTrimNumTailZero($value, trimTailZero);
    // 千分位
    $value  = processThousandsSplit($value, delimiter);
    // 后缀大小写
    $suffix = processSuffixUppercase($suffix, suffixUpperCase);

    // calc 函数必须返回这 3 个变量
    return {
      $sign, // 符号部分 [+-]
      $value, // 数值部分
      $suffix // 后缀部分
    }
  }
}

// 注册
StrategyManager.register(new MyStrategy('my'));

// 使用
export default () => (<h1>{anf({ calcStrategy: 'my' }, 1234)}</h1>);