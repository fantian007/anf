/**
 * 提取字符串中 整数和小数部分
 * 
 * @example
 * 1.23 -> [1, 23]
 * '' -> null
 * 
 * @param str 入参
 * @returns [整数, 小数] | null
 */
const pickIntergerAndDecimal = (str: string): [string, string | null] | null => {
  const ret = str.match(/(\d+)(?=\.?(\d+)?)/);

  if (ret && ret.length >= 3) {
    const integer = ret[1];
    const decimal = ret[2];

    return [integer, decimal];
  }
  else {
    return null
  }
}

export default pickIntergerAndDecimal;
