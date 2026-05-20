import { ICalcStrategy, IFormatStrategy, IStrategyType } from '../typings';
import Strategy from './Strategy';
import DefaultCalcStrategy from './calc/DefaultCalcStrategy';
import DefaultFormatStrategy from './format/DefaultFormatStrategy';
import BuiltInStrategies from './built-in';

class StrategyManager {
  private calcStrategies = new Map<string, Strategy>();
  private formatStrategies = new Map<string, Strategy>();

  constructor(strategies: Strategy[]) {
    for (const s of strategies) this.register(s);
  }

  register(strategy: Strategy) {
    if (strategy.type === 'calc') {
      this.calcStrategies.set(strategy.name, strategy);
    } else {
      this.formatStrategies.set(strategy.name, strategy);
    }
  }

  getStrategy<T extends Strategy = Strategy>(type: IStrategyType, name: ICalcStrategy | IFormatStrategy): T | undefined {
    if (type === 'calc') return this.calcStrategies.get(name) as T | undefined;
    return this.formatStrategies.get(name) as T | undefined;
  }

  getStrategies(type?: IStrategyType): Strategy[] {
    if (type === 'calc') return [...this.calcStrategies.values()];
    if (type === 'format') return [...this.formatStrategies.values()];
    return [...this.calcStrategies.values(), ...this.formatStrategies.values()];
  }
}

const defaultStrategies: Strategy[] = [];
for (const s of BuiltInStrategies) {
  defaultStrategies.push(new DefaultCalcStrategy(s.name, s.data));
}
defaultStrategies.push(new DefaultFormatStrategy('default'));

export { StrategyManager };
export default new StrategyManager(defaultStrategies);
