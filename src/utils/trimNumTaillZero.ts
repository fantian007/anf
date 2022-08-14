
/**
 * 去除入参字符串小数部分尾部的 0
 * 
 * @param str {string} - 入参
 * @returns 
 */
const trimNumTaillZero = (str: string): string => {
  return str.replace(/\.\d*?(0+)$/, (s) => s.replace(/0+$/, '').replace(/\.$/, ''));
}

export default trimNumTaillZero;
