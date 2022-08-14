import AbstractFormatStrategy from "./AbstractFormatStrategy";
import { output } from "../../helpers";

import {
  IValue,
  IOption,
  IParse,
  ICalc
} from "../../typings";

class DefaultFormatStrategy extends AbstractFormatStrategy {
  format(value: IValue, option: Exclude<IOption, 'formatStrategy'> & { formatStrategy: AbstractFormatStrategy }, parse: IParse, calc: ICalc) {
    return output(Object.assign<{ value: IValue }, IOption, IParse, ICalc>({ value }, option, parse, calc));
  }
}

export default DefaultFormatStrategy;
