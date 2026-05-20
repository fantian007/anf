import { ICalc, ICalcStrategy, IOption, IParse, IValue } from '../../typings';
import Strategy from '../Strategy';

abstract class AbstractCalcStrategy extends Strategy {
  abstract readonly type: 'calc';
  abstract calc(value: IValue, option: IOption, parse: IParse): ICalc;
}

export default AbstractCalcStrategy;
