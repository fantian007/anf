import BN from 'bignumber.js';

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
  public static mergeOption(option: IOption | undefined, ...options: IOption[]): IOption {
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
    if (!isValid(value.toString())) {
      return new InvalidInputError();
    }
    return void 0;
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
  private mergeOption(option?: IOption): IOption {
    const userOption = AutoNumberFormat.mergeOption(this.inputOption, option);
    const retOption = AutoNumberFormat.mergeOption(defaultOption, userOption);
    // suffix/suffixUpperCase/space 始终以用户侧为准（即使 undefined），
    // 因为 undefined 后缀在 calc 阶段触发自动单位计算
    retOption.suffix = userOption.suffix;
    retOption.suffixUpperCase = userOption.suffixUpperCase;
    retOption.space = userOption.space;
    return retOption;
  }

  // 解析
  private parse(): IParse {
    const valueStr = (this.inputValue as string | number).toString();

    const _sign   = pickSign(valueStr);           // 符号
    let   _value  = pickNumWithoutSign(valueStr); // 数值部分
    const _suffix = pickTailNonNum(valueStr);     // 后缀

    _value = this.handleInputValue(_value);       // 数值处理

    // 提取整数和小数部分
    const [_integer, _decimal] = pickIntergerAndDecimal(_value) as [string, string | null];

    return { _sign, _value, _suffix, _integer, _decimal };
  }

  // 计算
  private calc(option: IOption, calcStrategy: AbstractCalcStrategy): ICalc {
    return calcStrategy.calc(this.inputValue, option, this.parseValue!);
  }

  // 格式化输出
  public format(option?: IOption): string {
    const mergedOption = this.mergeOption(option);

    if (this.error) {
      // 输入值为 null | undefined | ''（空值）时，若指定了默认值，那么输出默认值，否则输出空字符串
      if (this.error instanceof EmptyInputError) {
        return mergedOption.defaultValue || '';
      }
      // 输入值不为空值时，且没有通过有效性校验，抛出错误
      throw new Error(this.error.message);
    }

    // 计算策略
    const calcStrategyIns =
      StrategyManager.getStrategy<AbstractCalcStrategy>('calc', mergedOption.calcStrategy || DEFAULT_CALC_STRATEGY)
      || StrategyManager.getStrategy<AbstractCalcStrategy>('calc', DEFAULT_CALC_STRATEGY)!;

    this.calcValue = this.calc(mergedOption, calcStrategyIns);

    // 输出策略
    const formatStrategyIns =
      StrategyManager.getStrategy<AbstractFormatStrategy>('format', mergedOption.formatStrategy || DEFAULT_FORMAT_STRATEGY)
      || StrategyManager.getStrategy<AbstractFormatStrategy>('format', DEFAULT_FORMAT_STRATEGY)!;

    return formatStrategyIns.format(this.inputValue, mergedOption, this.parseValue!, this.calcValue);
  }
}

// 函数形式
const autoNumberFormat: IAutoNumberFormatFunc = (p1: IOption | IValue, p2?: IValue): any => {
  if (isOption(p1)) {
    if (!isNil(p2)) {
      return new AutoNumberFormat(p2).format(p1);
    }
    // 支持 overrideOption 覆盖配置
    return (value: IValue, overrideOption?: IOption) => {
      return new AutoNumberFormat(value, p1).format(overrideOption);
    };
  }
  return new AutoNumberFormat(p1).format();
};

export default autoNumberFormat;
export { default as StrategyManager } from './strategies/StrategyManager';
export { default as AbstractCalcStrategy } from './strategies/calc/AbstractCalcStrategy';
export { default as AbstractFormatStrategy } from './strategies/format/AbstractFormatStrategy';
export * as Helpers from './helpers';
