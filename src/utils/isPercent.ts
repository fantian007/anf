
/**
 * 检验入参 是否是 %
 * 
 * @param value {string} - 入参
 * @returns boolean
 */
const isPercent = (value: string): boolean => {
  return /%$/.test(value);
}

export default isPercent;
