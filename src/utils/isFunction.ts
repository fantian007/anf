/**
 * 检验入参 是否为 函数
 * 
 * @param value {any} - 入参
 * @returns 
 */
const isFunction = (value: any): value is Function => {
  return Object.prototype.toString.call(value) === '[object Function]';
}

export default isFunction;
