import IErrorCodes from '../typings/IErrorCodes';

/**
 * 错误基类
 */
export default class BaseError extends Error {
  protected code: IErrorCodes;

  constructor (code: IErrorCodes, message: string) {
    super(message)

    this.code = code;
  }
}
