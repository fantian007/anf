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

  /**
   * 注册策略
   * 存在相同策略则替换，否则新增
   */
  register(strategy: Strategy) {
    if (strategy.type === 'calc') {
      this.calcStrategies.set(strategy.name, strategy);
    } else {
      this.formatStrategies.set(strategy.name, strategy);
    }
  }

  /**
   * 获取策略
   */
  getStrategy<T extends Strategy = Strategy>(type: IStrategyType, name: ICalcStrategy | IFormatStrategy): T | undefined {
    if (type === 'calc') return this.calcStrategies.get(name) as T | undefined;
    return this.formatStrategies.get(name) as T | undefined;
  }

  /**
   * 获取策略集合
   */
  getStrategies(type?: IStrategyType): Strategy[] {
    if (type === 'calc') return [...this.calcStrategies.values()];
    if (type === 'format') return [...this.formatStrategies.values()];
    return [...this.calcStrategies.values(), ...this.formatStrategies.values()];
  }
}

// 默认策略
const defaultStrategies: Strategy[] = [];

// 默认计算策略
for (const s of BuiltInStrategies) {
  defaultStrategies.push(new DefaultCalcStrategy(s.name, s.data));
}
// 默认输出策略
defaultStrategies.push(new DefaultFormatStrategy('default'));

export { StrategyManager };
export default new StrategyManager(defaultStrategies);
