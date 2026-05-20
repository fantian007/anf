import { ICalcStrategy, IFormatStrategy, IStrategyType } from '../typings';

abstract class Strategy {
  abstract readonly type: IStrategyType;
  abstract readonly name: ICalcStrategy | IFormatStrategy;

  getType() { return this.type; }
  getName() { return this.name; }
}

export default Strategy;
