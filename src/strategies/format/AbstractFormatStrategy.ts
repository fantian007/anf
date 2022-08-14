import { ICalc, IFormatStrategy, IOption, IParse, IValue } from "../../typings";
import Strategy from "../Strategy";

/**
 * 输出策略类
 */
abstract class AbstractFormatStrategy extends Strategy {
  constructor(name: IFormatStrategy) {
    super('format', name);
  }
  // 输出
  public abstract format(value: IValue, option: IOption, parse: IParse, calc: ICalc): string;
}

export default AbstractFormatStrategy;
