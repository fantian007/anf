
/**
 * 校验入参 是否是 px 字符串（像素单位）
 * 
 * @param value {string} - 入参
 * @returns 
 */
const isPX = (value: string): boolean => {
  return /(px|PX)$/.test(value);
}

export default isPX;
