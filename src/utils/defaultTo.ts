import isNil from './isNil';

/**
 * 如入参值是 undefined | null, 则返回 n, 否则返回入参值
 * 
 * @param o {T} - 入参值
 * @param n {T} - 默认值
 * @returns T
 */
const defaultTo = <T>(o: T, n: T): T => {
  return isNil(o) ? n : o;
}

export default defaultTo;
