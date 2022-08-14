import { IOption } from '../typings';

/**
 * 是否是配置项
 * 
 * @param value {any} - 配置项
 * @returns
 */
const isOption = (value: any): value is IOption => {
  return typeof value === 'object' && value !== null || value === undefined;
}

export default isOption;
