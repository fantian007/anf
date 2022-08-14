import { thousandsSplit } from '../utils';

/**
 * 千分位处理
 * 
 * @param value {string} - 数值
 * @param delimiter {string | false | undefined} - 千分位分隔符
 * @returns string
 */
function processThousandsSplit(value: string, delimiter: string | false | undefined): string {
  if (delimiter) {
    // $value = new BN($value).toFormat({
    //   decimalSeparator: '.',
    //   groupSeparator: delimiter,
    //   groupSize: 3
    // })
    return thousandsSplit(value, delimiter);
  }
  else {
    return value;
  }
}

export default processThousandsSplit;
