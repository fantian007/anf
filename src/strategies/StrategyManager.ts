import { ICalcStrategy, IFormatStrategy, IStrategyType } from '../typings';
import Strategy from './Strategy';
import DefaultCalcStrategy from './calc/DefaultCalcStrategy';
import DefaultFormatStrategy from './format/DefaultFormatStrategy';
import BuiltInStrategies from './built-in';

class StrategyManager {
  private strageies: Strategy[] = [];

  constructor (strategies: Strategy[]) {
    this.strageies = strategies;
  }

  /**
   * 注册策略
   * 
   * @param strategy {Strategy} - 策略
   */
  register(strategy: Strategy) {
    const type = strategy.getType();
    const name = strategy.getName();

    const existSameStrategyIndex = this.getStrategyIndex(type, name);

    // 存在相同策略，替换
    if (existSameStrategyIndex !== -1) {
      this.strageies[existSameStrategyIndex] = strategy;
    }
    // 否则，新增
    else {
      this.strageies.push(strategy);
    }
  }

  /**
   * 获取策略
   * 
   * @param type {IStrategyType} - 策略类型
   * @param name {ICalcStrategy | IFormatStrategy} - 策略名
   * @returns Strategy | undefined
   */
  getStrategy(type: IStrategyType, name: ICalcStrategy | IFormatStrategy) {
    return this.strageies.find(f => f.getType() === type && f.getName() === name);
  }
 
  /**
   * 获取策略在策略集合中的索引
   * 
   * @param type {IStrategyType} - 策略类型
   * @param name {ICalcStrategy | IFormatStrategy} - 策略名
   * @returns number
   */
  getStrategyIndex(type: IStrategyType, name: ICalcStrategy | IFormatStrategy) {
    return this.strageies.findIndex(f => f.getType() === type && f.getName() === name);
  }

  /**
   * 获取策略集合
   * 
   * @returns Strategy[]
   */
  getStrategies() {
    return this.strageies;
  }
}

// 默认策略
const defaultStrateies: Strategy[] = [];

// 默认计算策略
for (const strategy of BuiltInStrategies) {
  defaultStrateies.push(new DefaultCalcStrategy(strategy.name, strategy.data));
}
// 默认输出策略
defaultStrateies.push(new DefaultFormatStrategy('default'));

export { StrategyManager };
export default new StrategyManager(defaultStrateies);
