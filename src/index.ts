import BN from 'bignumber.js';

// 默认配置
import defaultOption from './config/defaults';
import { DEFAULT_CALC_STRATEGY, DEFAULT_FORMAT_STRATEGY } from './config/constant';
import StrategyManager from './strategies/StrategyManager';
import AbstractCalcStrategy from './strategies/calc/AbstractCalcStrategy';
import AbstractFormatStrategy from './strategies/format/AbstractFormatStrategy';

import { EmptyInputError, InvalidInputError } from './errors';

import {
  isValid,
  isEmpty,
  isNil,
  isOption,
  pickSign,
  pickNumWithoutSign,
  pickTailNonNum,
  pickIntergerAndDecimal
} from './utils';

import {
  IValue,
  IOption,
  IParse,
  ICalc,
  IAutoNumberFormatFunc
} from './typings';

export class AutoNumberFormat {
  // 合并配置
  public static mergeOption(option: IOption | undefined, ...options: IOption[] | any[]): IOption {
    return Object.assign({}, option, ...options);
  }

  // 输入值
  public inputValue: IValue;
  // 错误标识
  public error: Error | undefined;
  // 默认配置
  public defaultOption: IOption = defaultOption;
  // 输入配置
  public inputOption?: IOption;
  // 解析值
  private parseValue: IParse | undefined;
  // 计算值
  private calcValue: ICalc | undefined;

  constructor(value: IValue, option?: IOption) {
    // 用户输入值
    this.inputValue = value;
    this.inputOption = option;

    // 校验
    this.error = this.checkInputValue(this.inputValue);

    if (!this.error) {
      // 解析输入值
      this.parseValue = this.parse();
    }
  }

  /**
   * 输入值校验
   */
  private checkInputValue(value: IValue): Error | undefined {
    if (isEmpty(value)) {
      return new EmptyInputError();
    }
    else if (!isValid(value.toString())) {
      return new InvalidInputError();
    } else {
      return void 0;
    }
  }

  /**
   * 输入值处理
   * 1. 科学计数法展开
   */
  private handleInputValue(value: BN.Value): string {
    return new BN(value).toString();
  }

  /**
   * 合并配置
   * 1. 默认配置
   * 2. 持久配置
   * 3. 临时配置
   */
  private mergeOption(option?: IOption) {
    let retOption: IOption = defaultOption;
    const mergedOption: IOption = AutoNumberFormat.mergeOption(this.inputOption, option);

    // 高优先级配置
    const {
      suffix,
      suffixUpperCase,
      space
    } = mergedOption;

    // 三部分配置合并
    retOption = AutoNumberFormat.mergeOption(retOption, mergedOption);

    // 重置高优先级配置
    retOption.suffix = suffix;
    retOption.suffixUpperCase = suffixUpperCase;
    retOption.space = space;

    return retOption;
  }

  // 解析
  private parse(): IParse {
    const valueStr = (this.inputValue as string | number).toString();

    const _sign   = pickSign(valueStr); // 符号
    let   _value  = pickNumWithoutSign(valueStr); // 数值部分
    const _suffix = pickTailNonNum(valueStr); // 后缀

    _value = this.handleInputValue(_value); // 数值处理

    // 提取整数和小数部分
    const [_integer, _decimal] = pickIntergerAndDecimal(_value) as [string, string | null];

    return ({
      _sign,
      _value,
      _suffix,
      _integer,
      _decimal
    });
  }

  // 计算
  private calc(option: IOption, calcStrategy: AbstractCalcStrategy): ICalc {
    return calcStrategy.calc(this.inputValue, option, this.parseValue!);
  }

  // 格式化输出
  public format(option?: IOption): string {
    const mergedOption = this.mergeOption(option);

    if (this.error) {
      // 输入值为 null | undefined | '' （空值）时，若指定了默认值，那么输出默认值，否则输出空字符串
      if (this.error instanceof EmptyInputError) {
        return mergedOption.defaultValue || '';
      }
      // 输入值不为空值时，且没有通过有效性校验，抛出错误
      else {
        throw new Error(this.error.message);
      }
    }

    // 计算策略
    let calcStrategyIns: AbstractCalcStrategy;

    const { calcStrategy = DEFAULT_CALC_STRATEGY } = mergedOption;
    
    calcStrategyIns = StrategyManager.getStrategy('calc', calcStrategy) as AbstractCalcStrategy;

    if (!calcStrategyIns) {
      calcStrategyIns = StrategyManager.getStrategy('format', DEFAULT_CALC_STRATEGY) as AbstractCalcStrategy;
    }

    this.calcValue = this.calc(mergedOption, calcStrategyIns);

    // 输出策略
    let formatStrategyIns: AbstractFormatStrategy;

    const { formatStrategy = DEFAULT_FORMAT_STRATEGY } = mergedOption;

    formatStrategyIns = StrategyManager.getStrategy('format', formatStrategy) as AbstractFormatStrategy;

    if (!formatStrategyIns) {
      formatStrategyIns = StrategyManager.getStrategy('format', DEFAULT_FORMAT_STRATEGY) as AbstractFormatStrategy;
    }

    return formatStrategyIns.format(this.inputValue, mergedOption, this.parseValue!, this.calcValue);
  }
}

// 函数形式
const autoNumberFormat: IAutoNumberFormatFunc = (p1: IOption | IValue, p2?: IValue): any => {
  if (isOption(p1)) {
    if (!isNil(p2)) {
      return new AutoNumberFormat(p2).format(p1);
    }
    else {
      // 支持 overrideOption 覆盖配置
      return (value: IValue, overrideOption?: IOption) => {
        return new AutoNumberFormat(value, p1).format(overrideOption);
      }
    }
  } else {
    return new AutoNumberFormat(p1).format();
  }
}

export default autoNumberFormat;
export { default as StrategyManager } from './strategies/StrategyManager';
export { default as AbstractCalcStrategy } from './strategies/calc/AbstractCalcStrategy';
export { default as AbstractFormatStrategy } from './strategies/format/AbstractFormatStrategy';
export * as Helpers from './helpers';
