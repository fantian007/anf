import isNil from './isNil';

/**
 * 提取入参字符串尾部的 非数值 部分
 * 
 * @param str {string} - 入参
 * @returns string | null
 */
const pickTailNonNum = (str: string): string | null => {
  const matchRet = str.match(/(\D+)$/);

  if (!isNil(matchRet) && matchRet.length) {
    return matchRet[0]
  }
  else {
    return null;
  }
}

export default pickTailNonNum;
