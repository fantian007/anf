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

/**
 * 默认计算策略
 * 前置条件：配置项未指定后缀
 * 规则：以整数部分的长度区间自动计算后缀；如检测到后缀，或者指定后缀，那么不自动计算后缀
 */
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

  // 获取除数因子和后缀
  getDividerAndSuffix(len: number = 0) {
    for (const [n, s] of this.dataMap.entries()) {
      if (len >= n) {
        const divider = Math.pow(1e1, n - 1);
        const suffix = s;
        return { divider, suffix };
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

    // 未检测到后缀，那么自动计算单位；否则，不进行单位的自动计算
    if (isNil(suffix)) {
      if (isEmpty(_suffix)) {
        const ret = this.getDividerAndSuffix(_integer.toString().length);

        if (isNil(ret)) {
          $suffix = null;
        } else {
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

    // 精度处理
    $value = processPrecision($value, precision);
    // 末尾0
    $value = processTrimNumTailZero($value, trimTailZero);
    // 千分位
    $value = processThousandsSplit($value, delimiter);
    // 后缀大小写
    $suffix = processSuffixUppercase($suffix, suffixUpperCase);

    return { $sign, $value, $suffix };
  }
}

export default DefaultCalcStrategy;
