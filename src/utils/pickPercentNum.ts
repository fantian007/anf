/**
 * 提取百分比字符串中的数值部分
 * @example 12% -> 12
 * 
 * @param px {string} - 带%单位的字符串
 * @returns number
 */
const pickPercentNum = (px: string): number => {
  return parseFloat(px.replace(/px/, ''));
}

export default pickPercentNum;
