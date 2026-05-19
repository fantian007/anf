import { describe, it, expect } from 'vitest';

import isValid from '../src/utils/isValid';
import isEmpty from '../src/utils/isEmpty';
import isNil from '../src/utils/isNil';
import isBoolean from '../src/utils/isBoolean';
import isNumber from '../src/utils/isNumber';
import isFunction from '../src/utils/isFunction';
import isOption from '../src/utils/isOption';
import isPercent from '../src/utils/isPercent';
import isPX from '../src/utils/isPX';
import pickSign from '../src/utils/pickSign';
import pickNum from '../src/utils/pickNum';
import pickNumWithoutSign from '../src/utils/pickNumWithoutSign';
import pickIntergerAndDecimal from '../src/utils/pickIntergerAndDecimal';
import pickTailNonNum from '../src/utils/pickTailNonNum';
import pickPercentNum from '../src/utils/pickPercentNum';
import pickPXNum from '../src/utils/pickPXNum';
import thousandsSplit from '../src/utils/thousandsSplit';
import trimNumTaillZero from '../src/utils/trimNumTaillZero';
import defaultTo from '../src/utils/defaultTo';

describe('isValid', () => {
  it('accepts plain integers', () => expect(isValid('123')).toBe(true));
  it('accepts negative numbers', () => expect(isValid('-456')).toBe(true));
  it('accepts decimal numbers', () => expect(isValid('1.5')).toBe(true));
  it('accepts scientific notation', () => expect(isValid('1e+6')).toBe(true));
  it('accepts number with suffix', () => expect(isValid('12px')).toBe(true));
  it('accepts Chinese suffix', () => expect(isValid('100万元')).toBe(true));
  it('rejects plain text', () => expect(isValid('abc')).toBe(false));
  it('rejects empty string', () => expect(isValid('')).toBe(false));
});

describe('isEmpty', () => {
  it('true for null', () => expect(isEmpty(null)).toBe(true));
  it('true for undefined', () => expect(isEmpty(undefined)).toBe(true));
  it('true for empty string', () => expect(isEmpty('')).toBe(true));
  it('false for 0', () => expect(isEmpty(0)).toBe(false));
  it('false for string', () => expect(isEmpty('hello')).toBe(false));
});

describe('isNil', () => {
  it('true for null', () => expect(isNil(null)).toBe(true));
  it('true for undefined', () => expect(isNil(undefined)).toBe(true));
  it('false for 0', () => expect(isNil(0)).toBe(false));
  it('false for empty string', () => expect(isNil('')).toBe(false));
});

describe('isBoolean', () => {
  it('true for true', () => expect(isBoolean(true)).toBe(true));
  it('true for false', () => expect(isBoolean(false)).toBe(true));
  it('false for string', () => expect(isBoolean('true')).toBe(false));
  it('false for number', () => expect(isBoolean(1)).toBe(false));
});

describe('isNumber', () => {
  it('true for integer string', () => expect(isNumber('123')).toBe(true));
  it('true for decimal string', () => expect(isNumber('1.5')).toBe(true));
  it('false for string with suffix', () => expect(isNumber('12px')).toBe(false));
  it('false for empty', () => expect(isNumber('')).toBe(false));
});

describe('isFunction', () => {
  it('true for function', () => expect(isFunction(() => {})).toBe(true));
  it('false for object', () => expect(isFunction({})).toBe(false));
  it('false for null', () => expect(isFunction(null)).toBe(false));
});

describe('isOption', () => {
  it('true for plain object', () => expect(isOption({})).toBe(true));
  it('true for undefined', () => expect(isOption(undefined)).toBe(true));
  it('false for string', () => expect(isOption('opt')).toBe(false));
  it('false for number', () => expect(isOption(123)).toBe(false));
});

describe('isPercent', () => {
  it('true for % suffix', () => expect(isPercent('12%')).toBe(true));
  it('false without %', () => expect(isPercent('12')).toBe(false));
  it('false for px suffix', () => expect(isPercent('12px')).toBe(false));
});

describe('isPX', () => {
  it('true for px suffix', () => expect(isPX('12px')).toBe(true));
  it('true for PX uppercase', () => expect(isPX('12PX')).toBe(true));
  it('false without px', () => expect(isPX('12')).toBe(false));
  it('false for %', () => expect(isPX('12%')).toBe(false));
});

describe('pickSign', () => {
  it('extracts positive sign', () => expect(pickSign('+123')).toBe('+'));
  it('extracts negative sign', () => expect(pickSign('-123')).toBe('-'));
  it('returns null without sign', () => expect(pickSign('123')).toBeNull());
});

describe('pickNum', () => {
  it('extracts number from simple value', () => expect(pickNum('123px')).toBe('123'));
  it('extracts number with decimal', () => expect(pickNum('1.5px')).toBe('1.5'));
  it('returns whole string if no suffix', () => expect(pickNum('123')).toBe('123'));
});

describe('pickNumWithoutSign', () => {
  it('removes positive sign', () => expect(pickNumWithoutSign('+123')).toBe('123'));
  it('removes negative sign', () => expect(pickNumWithoutSign('-456')).toBe('456'));
  it('keeps unsigned unchanged', () => expect(pickNumWithoutSign('789')).toBe('789'));
});

describe('pickIntergerAndDecimal', () => {
  it('splits integer and decimal', () => {
    expect(pickIntergerAndDecimal('1.5')).toEqual(['1', '5']);
  });
  it('handles integer only', () => {
    expect(pickIntergerAndDecimal('100')).toEqual(['100', undefined]);
  });
  it('handles trailing dot', () => {
    expect(pickIntergerAndDecimal('1.')).toEqual(['1', undefined]);
  });
});

describe('pickTailNonNum', () => {
  it('extracts px suffix', () => expect(pickTailNonNum('12px')).toBe('px'));
  it('extracts Chinese suffix', () => expect(pickTailNonNum('100万元')).toBe('万元'));
  it('returns null for pure number', () => expect(pickTailNonNum('123')).toBeNull());
});

describe('pickPercentNum', () => {
  it('extracts number from percent', () => expect(pickPercentNum('12%')).toBe(12));
  it('handles decimal percent', () => expect(pickPercentNum('1.5%')).toBe(1.5));
});

describe('pickPXNum', () => {
  it('extracts number from px', () => expect(pickPXNum('12px')).toBe(12));
  it('handles uppercase PX', () => expect(pickPXNum('12PX')).toBe(12));
  it('handles decimal px', () => expect(pickPXNum('1.5px')).toBe(1.5));
});

describe('thousandsSplit', () => {
  it('adds commas to integer', () => expect(thousandsSplit('1234567', ',')).toBe('1,234,567'));
  it('handles custom delimiter', () => expect(thousandsSplit('1234567', ' ')).toBe('1 234 567'));
  it('handles small numbers', () => expect(thousandsSplit('123', ',')).toBe('123'));
});

describe('trimNumTaillZero', () => {
  it('trims trailing zeros', () => expect(trimNumTaillZero('1.100')).toBe('1.1'));
  it('handles no trailing zeros', () => expect(trimNumTaillZero('1.101')).toBe('1.101'));
  it('handles integer', () => expect(trimNumTaillZero('100')).toBe('100'));
});

describe('defaultTo', () => {
  it('returns default for null', () => expect(defaultTo(null, 'fallback')).toBe('fallback'));
  it('returns default for undefined', () => expect(defaultTo(undefined, 'fallback')).toBe('fallback'));
  it('returns value for valid', () => expect(defaultTo('value', 'fallback')).toBe('value'));
});
