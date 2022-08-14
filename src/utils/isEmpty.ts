import { IInputValue } from '../typings';

/**
 * 输入值是否为空
 * 
 * @param value {IInputValue} - 输入值
 * @returns boolean
 */
const isEmpty = (value: IInputValue): value is null | undefined | '' => {
  return value === undefined || value === null || value === '';
}

export default isEmpty;
