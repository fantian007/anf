import { expect, test } from '@jest/globals';
// import { AutoNumberFormat } from '../src';
// import autoNumberFormat from '../src';
import autoNumberFormat, { AutoNumberFormat } from '../dist/esm/index';

import { IDelayCalcFunc } from '../src/typings';

test('1.100 => 1.1', () => {
  expect(new AutoNumberFormat('1.100').format()).toBe('1.1');
});

test('1.101 => 1.10', () => {
  expect(new AutoNumberFormat('1.101').format({ precision: 2, trimTailZero: false })).toBe('1.10');
});

test('1.101 => 1', () => {
  expect(new AutoNumberFormat('1.101').format({ precision: 0, trimTailZero: false })).toBe('1');
});

test('1.661 => 2', () => {
  expect(new AutoNumberFormat('1.661').format({ precision: 0, trimTailZero: false })).toBe('2');
});

test('1.661% => 2%', () => {
  expect(new AutoNumberFormat('1.661%').format({ precision: 0, trimTailZero: false })).toBe('2%');
});

test('1.101（precision: 2, trimTailZero: false） => 1.10', () => {
  expect(new AutoNumberFormat('1.101').format({ precision: 2, trimTailZero: false })).toBe('1.10');
});

test('1.101（precision: 3）=> 1.101', () => {
  expect(new AutoNumberFormat('1.101').format({ precision: 3 })).toBe('1.101');
});

test('1.10101（precision: 3, trimTailZero: true) => 1.1010', () => {
  expect(new AutoNumberFormat('1.101').format({ precision: 4, trimTailZero: true })).toBe('1.101');
});

test('1.101% => 1.1%', () => {
  expect(new AutoNumberFormat('1.101%').format()).toBe('1.1%');
});

test('1234567.101% => 1,234,567.1 %', () => {
  expect(new AutoNumberFormat('1234567.101%').format()).toBe('1,234,567.1%');
});

test('1234567.101% => 1,234,567.1 %', () => {
  expect(new AutoNumberFormat('1234567.101%').format({ space: true })).toBe('1,234,567.1 %');
});

test('1.101# => 1.1#', () => {
  expect(new AutoNumberFormat('1.101#').format()).toBe('1.1#');
});

test('1.1 => 1.1000', () => {
  expect(new AutoNumberFormat('1.1').format({ trimTailZero: false, precision: 3 })).toBe('1.100');
});

test('123456789 => 123.46M', () => {
  expect(new AutoNumberFormat('123456789').format({ calcStrategy: 'en_US', suffixUpperCase: true })).toBe('123.46M');
});

test('123456789 => 123.46M', () => {
  expect(new AutoNumberFormat('123456789').format({ suffix: '' })).toBe('123,456,789');
});

test('123456789 => 123.46M', () => {
  expect(new AutoNumberFormat('123456789').format({ suffix: '', delimiter: ',' })).toBe('123,456,789');
});

test('1234 => 1.23K', () => {
  expect(new AutoNumberFormat('1234').format({ calcStrategy: 'en_US', suffixUpperCase: true })).toBe('1.23K');
});

test('1234 => 1.23k', () => {
  expect(new AutoNumberFormat('1234').format({ calcStrategy: 'en_US', suffixUpperCase: false })).toBe('1.23k');
});

test('1234 => 1.23k', () => {
  expect(new AutoNumberFormat('1234').format({ calcStrategy: 'en_US', suffixUpperCase: true })).toBe('1.23K');
});

test('1.0% => 1%', () => {
  expect(new AutoNumberFormat('1.0%').format()).toBe('1%');
});

test('1.01% => 1.01%', () => {
  expect(new AutoNumberFormat('1.01%').format()).toBe('1.01%');
});

test('1.01% => 1.0100%', () => {
  expect(new AutoNumberFormat('1.01%').format({ precision: 4, trimTailZero: false })).toBe('1.0100%');
});

test('1.01% => 1.0%', () => {
  expect(new AutoNumberFormat('1.01%').format({ precision: 1 })).toBe('1%');
});

test('1234 => 1,234', () => {
  expect(new AutoNumberFormat('1234').format({ calcStrategy: 'zh_CN' })).toBe('1,234');
});

test('1234.567 => 1234.57', () => {
  expect(new AutoNumberFormat('1234.567').format({ calcStrategy: 'zh_CN', delimiter: false })).toBe('1234.57');
});

test('1234.567美元 => 1234.57美元', () => {
  expect(new AutoNumberFormat('1234.567美元').format({ calcStrategy: 'zh_CN', delimiter: undefined })).toBe('1234.57美元');
});

test('1234px => 1,234px', () => {
  expect(new AutoNumberFormat('1234px').format()).toBe('1,234px');
});

test('1234PX => 1,234PX', () => {
  expect(new AutoNumberFormat('1234PX').format()).toBe('1,234PX');
});

test('1234 PX => 1,234 PX', () => {
  expect(new AutoNumberFormat('1234 PX').format()).toBe('1,234 PX');
});

test('1234 PX => 1,234PX', () => {
  expect(new AutoNumberFormat('1234 PX').format({ space: false })).toBe('1,234PX');
});

test('1234 PX => 1,234 px', () => {
  expect(new AutoNumberFormat('1234 PX').format({ suffixUpperCase: false })).toBe('1,234 px');
});

test('1234 PX => 1,234日元', () => {
  expect(new AutoNumberFormat('1234 PX').format({ suffix: '日元' })).toBe('1,234日元');
});

test('1234 PX => 1,234 日元', () => {
  expect(new AutoNumberFormat('1234 PX').format({ suffix: ' 日元' })).toBe('1,234 日元');
});

test('1234 PX => 1,234 日元', () => {
  expect(new AutoNumberFormat('1234 PX').format({ suffix: '日元', space: true })).toBe('1,234 日元');
});

test('1234 PX => 1234 日元', () => {
  expect(new AutoNumberFormat('1234 日元').format({ suffix: '日元', space: true, delimiter: false })).toBe('1234 日元');
});

test('0', () => {
  expect(new AutoNumberFormat('0').format()).toBe('0');
});

test('000a', () => {
  expect(new AutoNumberFormat('000a').format()).toBe('0a');
});

test('', () => {
  expect(new AutoNumberFormat('').format()).toBe('-');
});

test('', () => {
  expect(new AutoNumberFormat('').format({ defaultValue: '0' })).toBe('0');
});

test('', () => {
  expect(new AutoNumberFormat('').format({ defaultValue: '0', precision: 3 })).toBe('0');
});

test('', () => {
  expect(new AutoNumberFormat('').format({ defaultValue: '0.000' })).toBe('0.000');
});

test('0', () => {
  expect(new AutoNumberFormat('0').format({ defaultValue: '0', precision: 3 })).toBe('0');
});

test('0', () => {
  expect(new AutoNumberFormat(0).format()).toBe('0');
});

test('0', () => {
  expect(new AutoNumberFormat('0').format({ trimTailZero: true })).toBe('0');
});

test('0', () => {
  expect(new AutoNumberFormat(0).format({ trimTailZero: true })).toBe('0');
});

test('0', () => {
  expect(new AutoNumberFormat(0).format({ trimTailZero: false, precision: 3 })).toBe('0.000');
});

test('0', () => {
  expect(new AutoNumberFormat(0).format({ trimTailZero: true, defaultValue: '0', suffix: '斤', space: true })).toBe('0 斤');
});

test('undefined', () => {
  expect(new AutoNumberFormat(undefined).format()).toBe('-');
});

test('null', () => {
  expect(new AutoNumberFormat(null).format()).toBe('-');
});

test('null', () => {
  expect(new AutoNumberFormat(null).format({ defaultValue: '0' })).toBe('0');
});

test('null', () => {
  expect(new AutoNumberFormat(null).format({ defaultValue: '0' })).toBe('0');
});

test('null', () => {
  expect(new AutoNumberFormat(null).format({ defaultValue: 'null', suffix: '美元' })).toBe('null');
});

test('123456 => 12.35万', () => {
  expect(new AutoNumberFormat(123456).format({ calcStrategy: 'zh_CN' })).toBe('12.35万');
});

test('123456 => 12.34560万', () => {
  expect(new AutoNumberFormat(123456).format({ calcStrategy: 'zh_CN', precision: 5 })).toBe('12.3456万');
});

test('123456 => 12.34560万', () => {
  expect(new AutoNumberFormat(123456).format({ calcStrategy: 'zh_CN', precision: 5, trimTailZero: false })).toBe('12.34560万');
});

test('0你好 => 0你好', () => {
  expect(new AutoNumberFormat('0你好').format()).toBe('0你好');
});

test('0 你好 => -', () => {
  expect(new AutoNumberFormat('0 你好').format()).toBe('0 你好');
});

test('0 你好 => -', () => {
  expect(new AutoNumberFormat('0 你好').format({ space: false })).toBe('0你好');
});

test('0 你好 => -', () => {
  expect(new AutoNumberFormat('0 你好').format({ space: false, precision: 2 })).toBe('0你好');
});

test('0 你好 => -', () => {
  expect(new AutoNumberFormat('0 你好').format({ space: false, precision: 2, trimTailZero: false })).toBe('0.00你好');
});

test('0.000 你好 => -', () => {
  expect(new AutoNumberFormat('0.000 你好').format({ space: false, trimTailZero: true })).toBe('0你好');
});

test('0.000 你好 => -', () => {
  expect(new AutoNumberFormat('0.000 你好').format({ space: false, trimTailZero: false })).toBe('0.00你好');
});

test('0.000 你好 => -', () => {
  expect(new AutoNumberFormat('0.000 你好').format({ space: false, trimTailZero: false, precision: 3 })).toBe('0.000你好');
});

test('12345.010 => 12,345.01', () => {
  expect(autoNumberFormat({ calcStrategy: 'zh_CN' }, '12345.010')).toBe('1.23万');
});

test('12345.010 => 12,345.01', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('12345.010')).toBe('1.23万');
});

test('1234.567% => 1,234.57%', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('1234.567%')).toBe('1,234.57%');
});

test('1234.567% => 1234.57%', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN', delimiter: false }) as IDelayCalcFunc)('1234.567%')).toBe('1234.57%');
});

test('540453', () => {
  expect((autoNumberFormat({ suffix: '次' }) as IDelayCalcFunc)('540453')).toBe('540,453次');
});

test('-12345', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('-12345')).toBe('-1.23万');
});

test('1e+6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)(1e+6)).toBe('100万');
});

test('1e6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)(1e6)).toBe('100万');
});

test('1e6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('1e6')).toBe('100万');
});

test('1e+6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('1e+6')).toBe('100万');
});

test('1e+6', () => {
  // 1.23456789e6 => 1234567.89 => 123.46万
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('1.23456789E+6')).toBe('123.46万');
});

test('1e+6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN', trimTailZero: false, precision: 3 }) as IDelayCalcFunc)('1.23456789E-3')).toBe('0.001');
});

test('1e+6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN', delimiter: false, suffix: '' }) as IDelayCalcFunc)('1e+6')).toBe('1000000');
});

test('1e+6', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN', delimiter: ',', suffix: '' }) as IDelayCalcFunc)('1e+6')).toBe('1,000,000');
});

test('覆盖配置', () => {
  expect((autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc)('12345', { calcStrategy: 'en_US' })).toBe('12.35K');
});

test('自定义策略', () => {
  expect((autoNumberFormat({ calcStrategy: 'star' }) as IDelayCalcFunc)('12345')).toBe('1.23☆☆☆☆☆');
});

test('自定义策略', () => {
  expect((autoNumberFormat({ calcStrategy: 'star' }) as IDelayCalcFunc)('1235')).toBe('1.24☆☆☆☆');
});
