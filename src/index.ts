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
  public static mergeOption(option: IOption | undefined, ...options: IOption[]): IOption {
    return Object.assign({}, option, ...options);
  }

  public inputValue: IValue;
  public error: Error | undefined;
  public defaultOption: IOption = defaultOption;
  public inputOption?: IOption;

  private parseValue: IParse | undefined;
  private calcValue: ICalc | undefined;

  constructor(value: IValue, option?: IOption) {
    this.inputValue = value;
    this.inputOption = option;
    this.error = this.checkInputValue(this.inputValue);
    if (!this.error) {
      this.parseValue = this.parse();
    }
  }

  private checkInputValue(value: IValue): Error | undefined {
    if (isEmpty(value)) return new EmptyInputError();
    if (!isValid(value.toString())) return new InvalidInputError();
    return void 0;
  }

  private handleInputValue(value: BN.Value): string {
    return new BN(value).toString();
  }

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

  private parse(): IParse {
    const valueStr = (this.inputValue as string | number).toString();
    const _sign = pickSign(valueStr);
    let _value = pickNumWithoutSign(valueStr);
    const _suffix = pickTailNonNum(valueStr);

    _value = this.handleInputValue(_value);

    const [_integer, _decimal] = pickIntergerAndDecimal(_value) as [string, string | null];

    return { _sign, _value, _suffix, _integer, _decimal };
  }

  private calc(option: IOption, calcStrategy: AbstractCalcStrategy): ICalc {
    return calcStrategy.calc(this.inputValue, option, this.parseValue!);
  }

  public format(option?: IOption): string {
    const mergedOption = this.mergeOption(option);

    if (this.error) {
      if (this.error instanceof EmptyInputError) {
        return mergedOption.defaultValue || '';
      }
      throw new Error(this.error.message);
    }

    const calcStrategyIns =
      StrategyManager.getStrategy<AbstractCalcStrategy>('calc', mergedOption.calcStrategy || DEFAULT_CALC_STRATEGY)
      || StrategyManager.getStrategy<AbstractCalcStrategy>('calc', DEFAULT_CALC_STRATEGY)!;

    this.calcValue = this.calc(mergedOption, calcStrategyIns);

    const formatStrategyIns =
      StrategyManager.getStrategy<AbstractFormatStrategy>('format', mergedOption.formatStrategy || DEFAULT_FORMAT_STRATEGY)
      || StrategyManager.getStrategy<AbstractFormatStrategy>('format', DEFAULT_FORMAT_STRATEGY)!;

    return formatStrategyIns.format(this.inputValue, mergedOption, this.parseValue!, this.calcValue);
  }
}

const autoNumberFormat: IAutoNumberFormatFunc = (p1: IOption | IValue, p2?: IValue): any => {
  if (isOption(p1)) {
    if (!isNil(p2)) {
      return new AutoNumberFormat(p2).format(p1);
    }
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
