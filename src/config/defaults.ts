import { IOption } from '../typings';

/**
 * 默认值
 */
import {
  DEFAULT_VALUE,
  DEFAULT_DELIMITER,
  DEFAULT_CALC_STRATEGY,
  DEFAULT_FORMAT_STRATEGY
} from './constant';

export default {
  precision: 2,
  space: false,
  trimTailZero: true,
  suffix: '',
  suffixUpperCase: false,
  delimiter: DEFAULT_DELIMITER,
  defaultValue: DEFAULT_VALUE,
  calcStrategy: DEFAULT_CALC_STRATEGY,
  formatStrategy: DEFAULT_FORMAT_STRATEGY
} as IOption;
