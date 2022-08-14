/**
 * 是否有效输入值
 * 
 * @param value {string} - 是否有效输入值
 * @returns boolean
 */
const isValid = (_value: string) => {
  // return /^[+-]?\d+(\.(?=\d))?\d*\s*[\w|@#$%|\u4e00-\u9fa5]*$/.test(value);
  // return /^[+-]?\d+(,\d+)*(.\d+(e\d+)?)?\d*\s*[\w|@#$%|\u4e00-\u9fa5]*$/.test(value);
  return true;
}

export default isValid;
