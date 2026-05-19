/**
 * 提取像素字符串中的数值部分
 * @example '12px' -> 12, '12PX' -> 12
 */
const pickPXNum = (value: string): number => {
  return parseFloat(value.replace(/px$/i, ''));
}

export default pickPXNum;
