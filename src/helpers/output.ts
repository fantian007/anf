import { IFinalVars } from '../typings';
import { isEmpty, exceptOutput, isNil, isBoolean } from '../utils';

const output = (variables: IFinalVars): string => {
  const {
    value,
    space,
    suffix,
    defaultValue,
    $sign,
    $suffix,
    $value
  } = variables;

  return exceptOutput([
    {
      filters: [
        [value, [isEmpty]]
      ],
      output: defaultValue || ''
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [suffix, [() => !isNil(suffix)]],
        [space, [isBoolean]],
        [space, [true]],
      ],
      output: () => `${$sign}${$value} ${suffix}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [suffix, [() => !isNil(suffix)]],
        [space, [isBoolean]],
        [space, [false]],
      ],
      output: () => `${$sign}${$value}${suffix}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [suffix, [() => !isNil(suffix)]],
        [space, [() => !isBoolean(space)]]
      ],
      output: () => `${$sign}${$value}${suffix}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [$suffix, [() => !isNil($suffix)]],
        [space, [isBoolean]],
        [space, [true]],
      ],
      output: () => `${$sign}${$value} ${$suffix?.trim()}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [$suffix, [() => !isNil($suffix)]],
        [space, [isBoolean]],
        [space, [false]],
      ],
      output: () => `${$sign}${$value}${$suffix?.trim()}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [$suffix, [() => !isNil($suffix)]],
        [space, [() => !isBoolean(space)]]
      ],
      output: `${$sign}${$value}${$suffix}`
    },
    {
      filters: [
        [value, [() => !isEmpty(value)]],
        [$suffix, [isNil]]
      ],
      output: `${$sign}${$value}`
    },
  ]);
}

export default output;
