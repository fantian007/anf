import IErrorCodes from '../typings/IErrorCodes';
import BaseError from './BaseError';

/**
 * 非有效输入值 错误
 */
export default class extends BaseError {
  constructor () {
    super(IErrorCodes.INVALID_INPUT, '非有效输入值');
  }
}
