import { ICalc, ICalcStrategy, IOption, IParse, IValue } from "../../typings";
import Strategy from "../Strategy";

/**
 * 计算策略类
 */
abstract class AbstractCalcStrategy extends Strategy {
  constructor(name: ICalcStrategy) {
    super('calc', name);
  }
  // 计算
  public abstract calc(value: IValue, option: IOption, parse: IParse): ICalc;
}

export default AbstractCalcStrategy;
