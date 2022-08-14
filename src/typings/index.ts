
/** 输入值 */
export type IInputValue = string | number | undefined | null;
/** 计算策略 */
export type ICalcStrategy = 'zh_CN' | 'en_US' | 'star' | Omit<string, 'zh_CN' | 'en_US' | 'star'>; // 中、英、其他策略
/** 输出策略 */
export type IFormatStrategy = 'default' | Omit<string, 'default'>; // 中、英、其他策略
/** 策略模式 */
export type IStrategyType = 'calc' | 'format';
/** 输入值 */
export type IValue = string | number | undefined | null | '';
/** 默认策略 data 项 */
export type IDefaultStrategyDataItem = [number, string];
/** 默认策略 data 项 Map 对象 */
export type IDefaultStrategyDataMap = Map<number, string>;
/** 策略配置项 */
export interface IDefaultStrategyConfig {
  type: IStrategyType;
  name: ICalcStrategy;
  data: IDefaultStrategyDataItem[];
}
/** 配置项 */
export interface IOption {
  /** 精度 */
  precision?: number;
  /** 是否需要数值和后缀间空格 */
  space?: boolean;
  /** 是否去除数值部分末尾的 0 */
  trimTailZero?: boolean;
  /** 后缀 */
  suffix?: string;
  /** 后缀是否大写 */
  suffixUpperCase?: boolean;
  /** 千分位分隔符 */
  delimiter?: string | false;
  /** 为 null | undefined | '' 时输出的默认值，默认 "-" */
  defaultValue?: string;
  /** 计算策略 */
  calcStrategy?: ICalcStrategy;
  /** 输出策略 */
  formatStrategy?: IFormatStrategy;
}
/** 最终应用的 option */
export type IParsedOption = Required<IOption>
/** 解析结果 */
export interface IParse {
  /** 符号部分 */
  _sign: string | null;
  /** 数值部分 */
  _value: string;
  /** 整数部分 */
  _integer: string;
  /** 小数部分 */
  _decimal: string | null;
  /** 非数值部分 */
  _suffix: string | null;
}
/** 计算结果 */
export interface ICalc {
  /** 符号部分 */
  $sign: string | null;
  /** 数值部分 */
  $value: string;
  /** 非数值部分 */
  $suffix: string | null;
}
export type IFinalVars = IOption & IParse & ICalc & { value: IValue };
/** 延迟计算函数 */
export interface IDelayCalcFunc {
  (value: IValue, overrideOption?: IOption): string;
}

export interface IAutoNumberFormatFunc {
  /**
   * 传入值，使用默认配置进行格式化
   * 
   * @see https://fantian007.github.io/anf
   */
  (value: IValue): string;
  /**
   * 传入配置，输出带配置的格式化函数，可以用该函数格式化多个值
   * 
   * @see https://fantian007.github.io/anf
   */
  (option: IOption): IDelayCalcFunc;
  /**
   * 传入配置+值，输出格式化的字符串
   * 
   * @see https://fantian007.github.io/anf
   */
  (option: IOption, value: IValue): string;
}
export type IFilter = [any, Array<any>];
export interface IExcept {
  filters: IFilter[];
  output: any;
}
