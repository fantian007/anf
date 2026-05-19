/**
 * 提取百分比字符串中的数值部分
 * @example '12%' -> 12
 */
const pickPercentNum = (value: string): number => {
  return parseFloat(value.replace(/%$/, ''));
}

export default pickPercentNum;
