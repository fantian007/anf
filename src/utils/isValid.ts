/**
 * 是否有效输入值
 * 支持: 正负号 + 数字 + 可选小数 + 可选科学计数法 + 可选后缀
 */
const isValid = (value: string): boolean => {
  return /^[+-]?[\d,]+(\.\d+)?([eE][+-]?\d+)?.*$/.test(value.trim());
}

export default isValid;
