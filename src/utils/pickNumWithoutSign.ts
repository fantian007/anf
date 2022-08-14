import pickSign from './pickSign';
import pickNum from './pickNum';

/**
 * 提取入参字符串中 去除符号 的部分
 * 
 * @param str {string} - 入参
 * @returns string
 */
const pickNumWithoutSign = (str: string): string => {
  const numWithSign = pickNum(str);
  const sign = pickSign(numWithSign);

  return sign ? numWithSign.replace(sign, '') : numWithSign;
}

export default pickNumWithoutSign;
