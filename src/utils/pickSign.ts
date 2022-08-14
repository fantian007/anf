import isNil from './isNil';

/**
 * 提取入参中的符号部分
 * @example 
 * +12px -> +
 * -0.1 -> -
 * 
 * @param px {string} - 入参
 * @returns string | null
 */

 const pickSign = (str: string): string | null => {
  const matchRet = /^([+-])\d+/.exec(str);

  if (!isNil(matchRet)) {
    return matchRet.length >= 1 ? matchRet[1] : null;
  } else {
    return null;
  }
}

export default pickSign;
