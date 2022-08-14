/**
 * 校验入参 是否为 null | undefined
 * 
 * @param value {any} - 入参
 * @returns boolean
 */
const isNil = (value: any): value is null | undefined => {
  return value === null || value === undefined;
}

export default isNil;
