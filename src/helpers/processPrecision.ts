import BN from 'bignumber.js';
import { isNil } from '../utils';
import defaultOption from '../config/defaults';

/**
 * 精度处理
 * 
 * @param value {string} - 数值
 * @param precision {number | undefined} - 精度
 * @returns string
 */
function processPrecision(value: string, precision: number | undefined = defaultOption.precision) {
  const bn = new BN(value);

  if (!isNil(precision)) {
    return bn.toFixed(precision);
  }
  else {
    return bn.toFixed(2); // 默认2位精度
  }
}

export default processPrecision;
