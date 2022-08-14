import { isNil, trimNumTaillZero } from '../utils';
import defaultOption from '../config/defaults';

/**
 * 末尾0 处理
 * 
 * @param value {string} - 数值
 * @param trimTailZero {boolean | undefined} - 是否去除末尾 0
 * @returns string
 */
function processTrimNumTailZero(value: string, trimTailZero: boolean | undefined = defaultOption.trimTailZero): string {
  if (!isNil(trimTailZero) && trimTailZero === true) {
    return trimNumTaillZero(value);
  }
  else {
    return value;
  }
}

export default processTrimNumTailZero;
