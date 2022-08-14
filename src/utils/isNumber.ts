
/**
 * 校验入参 是否是 数值类型
 * 
 * @param value {any} - 入参
 * @returns boolean
 */
const isNumber = (value: any): boolean => {
  return /^[0-9]+.?[0-9]*$/.test(value);
}

export default isNumber;
