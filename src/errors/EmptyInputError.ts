import IErrorCodes from '../typings/IErrorCodes';
import BaseError from './BaseError';

/**
 * 输入值为空 错误
 */
export default class extends BaseError {
  constructor () {
    super(IErrorCodes.EMPTY_INPUT, '输入值为空');
  }
}
