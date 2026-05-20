import { ICalc, IFormatStrategy, IOption, IParse, IValue } from '../../typings';
import Strategy from '../Strategy';

abstract class AbstractFormatStrategy extends Strategy {
  abstract readonly type: 'format';
  abstract format(value: IValue, option: IOption, parse: IParse, calc: ICalc): string;
}

export default AbstractFormatStrategy;
