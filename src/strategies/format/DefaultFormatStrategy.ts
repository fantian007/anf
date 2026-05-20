import AbstractFormatStrategy from './AbstractFormatStrategy';
import { output } from '../../helpers';
import { IValue, IOption, IParse, ICalc, IFormatStrategy } from '../../typings';

class DefaultFormatStrategy extends AbstractFormatStrategy {
  readonly type = 'format' as const;
  name: IFormatStrategy;

  constructor(name: IFormatStrategy) {
    super();
    this.name = name;
  }

  format(value: IValue, option: IOption, parse: IParse, calc: ICalc): string {
    return output(Object.assign({ value }, option, parse, calc));
  }
}

export default DefaultFormatStrategy;
