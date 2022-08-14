import isNil from './isNil';
import pickTailNonNum from './pickTailNonNum';


/**
 * 提取入参中的数值部分
 * 
 * @param str {string} - 入参
 * @returns string
 */
const pickNum = (str: string): string => {
  let ret = str;

  const nonNumPart = pickTailNonNum(str);

  if (!isNil(nonNumPart) && nonNumPart.length) {
    ret = str.replace(nonNumPart, '');
  }
  
  return ret;
}

export default pickNum;
