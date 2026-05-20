import BN from 'bignumber.js';
import AbstractCalcStrategy from './AbstractCalcStrategy';
import { IOption, IParse, ICalc, IDefaultStrategyDataItem, ICalcStrategy, IValue, IDefaultStrategyDataMap } from '../../typings';
import { isEmpty, isNil } from '../../utils';
import {
  processPrecision,
  processTrimNumTailZero,
  processThousandsSplit,
  processSuffixUppercase
} from '../../helpers';

class DefaultCalcStrategy extends AbstractCalcStrategy {
  readonly type = 'calc' as const;
  name: ICalcStrategy;

  private data: IDefaultStrategyDataItem[];
  private dataMap: IDefaultStrategyDataMap;

  constructor(name: ICalcStrategy, data: IDefaultStrategyDataItem[]) {
    super();
    this.name = name;
    this.data = data;
    this.dataMap = new Map<number, string>(data);
  }

  getData() {
    return this.data;
  }

  getDividerAndSuffix(len: number = 0) {
    for (const [n, s] of this.dataMap.entries()) {
      if (len >= n) {
        return { divider: Math.pow(1e1, n - 1), suffix: s };
      }
    }
    return null;
  }

  calc(value: IValue, option: IOption, parse: IParse): ICalc {
    const { precision, delimiter, trimTailZero, suffixUpperCase, suffix } = option;
    const { _sign, _value, _suffix, _integer } = parse;

    let $sign = ['+', null].includes(_sign) ? '' : _sign;
    let $value = _value.toString();
    let $suffix: string | null = null;
    let bn = new BN(_value);

    if (isNil(suffix)) {
      if (isEmpty(_suffix)) {
        const ret = this.getDividerAndSuffix(_integer.toString().length);
        if (!isNil(ret)) {
          bn = bn.dividedBy(ret!.divider);
          $suffix = ret!.suffix;
        }
        $value = bn.toString();
      } else {
        $suffix = _suffix;
      }
    } else {
      $suffix = suffix;
    }

    $value = processPrecision($value, precision);
    $value = processTrimNumTailZero($value, trimTailZero);
    $value = processThousandsSplit($value, delimiter);
    $suffix = processSuffixUppercase($suffix, suffixUpperCase);

    return { $sign, $value, $suffix };
  }
}

export default DefaultCalcStrategy;
