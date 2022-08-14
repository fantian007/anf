/**
 * 提取像素字符串中的数值部分
 * @example 12px -> 12
 * 
 * @param px {string} - 带像素单位的字符串
 * @returns number
 */
const pickPxNum = (px: string): number => {
  return parseFloat(px.replace(/px/, ''));
}

export default pickPxNum;
