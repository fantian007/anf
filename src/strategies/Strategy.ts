import { ICalcStrategy, IFormatStrategy, IStrategyType } from "../typings"

class Strategy {
  public type: IStrategyType; // 策略类型
  public name: ICalcStrategy | IFormatStrategy; // 策略名

  constructor (type: IStrategyType, name: ICalcStrategy | IFormatStrategy) {
    this.type = type;
    this.name = name;
  }

  public getName () {
    return this.name;
  }

  public getType () {
    return this.type;
  }
}

export default Strategy;
