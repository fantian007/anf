import { isEmpty, isBoolean } from '../utils';

/**
 * 后缀大小写
 * 
 * @param suffix {string | null | undefined} - 后缀
 * @param suffixUpperCase {boolean | undefined} - 后缀是否大写
 * @returns string | null | undefined
 */
function processSuffixUppercase(suffix: string | null | undefined, suffixUpperCase: boolean | undefined) {
  if (!isEmpty(suffix)) {
    if (isBoolean(suffixUpperCase)) {
      if (suffixUpperCase) {
        return suffix.toLocaleUpperCase();
      }
      else {
        return suffix.toLocaleLowerCase();
      }
    }
    else {
      return suffix;
    }
  }
  else {
    return suffix as string | null;
  }
}

export default processSuffixUppercase;
