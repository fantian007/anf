import { IExcept } from '../typings';
import { DEFAULT_VALUE } from '../config/constant';
import isFunction from './isFunction';

/**
 * 输出 期望值
 * 
 * @param excepts {IExcept[]} - 期望值配置
 * @returns string
 */
const exceptOutput = (excepts: IExcept[] = []): string => {
  for (let i = 0; i < excepts.length; i++) {
    const except = excepts[i];

    const {
      filters,
      output
    } = except;

    let pass = true;

    for (const filter of filters) {
      const source = filter[0];
      const values = filter[1];

      for (const v of values) {
        // 函数形式，需要返回 true
        if (isFunction(v)) {
          if (v(source) !== true) {
            pass = false;
            break;
          }
        }
        // 值形式，需要严格相等
        else {
          if (v !== source) {
            pass = false;
            break;
          }
        }
      }

      if (!pass) {
        break;
      }
    }

    if (pass) {
      if (typeof output === 'function') {
        return output.call();
      }
      else {
        return output;
      }
    }
    else {
      continue;
    }
  }

  return DEFAULT_VALUE;
}

export default exceptOutput;
