/**
 * 校验输入数值 是否为 布尔值
 * 
 * @param value {any} - 数值
 * @returns boolean
 */
const isBoolean = (value: any): value is boolean => {
  return value === true || value === false || Object.prototype.toString.call(value) === '[object Boolean]';
}

export default isBoolean;
