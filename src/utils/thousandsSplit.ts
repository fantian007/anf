import isEmpty from './isEmpty';

/**
 * 千分位处理
 * 
 * @param str {string} - 入参
 * @param delimiter 
 * @returns 
 */
const thousandsSplit = (str: string, delimiter: string = ','): string => {
  const [integer, decimal] = str.split('.');
  let splitInteger = integer;

  if (splitInteger !== '') {
    splitInteger = splitInteger.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${delimiter}`);

    if (!isEmpty(decimal)) {
      return `${splitInteger}.${decimal}`;
    }
    else {
      return `${splitInteger}`
    }
  }
  else {
    return str;
  }
}

export default thousandsSplit;
