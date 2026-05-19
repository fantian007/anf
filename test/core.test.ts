import { describe, it, expect } from 'vitest';
import autoNumberFormat, { AutoNumberFormat, StrategyManager } from '../src/index';
import { IDelayCalcFunc } from '../src/typings';

describe('AutoNumberFormat', () => {
  describe('basic formatting', () => {
    it('trims trailing zeros', () => {
      expect(new AutoNumberFormat('1.100').format()).toBe('1.1');
    });
    it('preserves decimal with trimTailZero=false', () => {
      expect(new AutoNumberFormat('1.101').format({ precision: 2, trimTailZero: false })).toBe('1.10');
    });
    it('rounds with precision 0', () => {
      expect(new AutoNumberFormat('1.661').format({ precision: 0, trimTailZero: false })).toBe('2');
    });
    it('handles precision 3', () => {
      expect(new AutoNumberFormat('1.101').format({ precision: 3 })).toBe('1.101');
    });
    it('forces tail zero when trimTailZero=true with precision', () => {
      expect(new AutoNumberFormat('1.1').format({ precision: 4, trimTailZero: true })).toBe('1.1');
    });
  });

  describe('suffix handling', () => {
    it('preserves percent suffix', () => {
      expect(new AutoNumberFormat('1.101%').format()).toBe('1.1%');
    });
    it('preserves hash suffix', () => {
      expect(new AutoNumberFormat('1.101#').format()).toBe('1.1#');
    });
    it('preserves PX suffix', () => {
      expect(new AutoNumberFormat('1234px').format()).toBe('1,234px');
    });
    it('overrides PX with custom suffix', () => {
      expect(new AutoNumberFormat('1234 PX').format({ suffix: '日元' })).toBe('1,234日元');
    });
    it('applies space option with custom suffix', () => {
      expect(new AutoNumberFormat('1234 PX').format({ suffix: '日元', space: true })).toBe('1,234 日元');
    });
    it('lowercases suffix', () => {
      expect(new AutoNumberFormat('1234 PX').format({ suffixUpperCase: false })).toBe('1,234px');
    });
  });

  describe('thousands separator', () => {
    it('adds commas', () => {
      expect(new AutoNumberFormat('1234567').format({ calcStrategy: 'zh_CN', suffix: '' })).toBe('1,234,567');
    });
    it('disables separator', () => {
      expect(new AutoNumberFormat('1234567').format({ calcStrategy: 'zh_CN', delimiter: false, suffix: '' })).toBe('1234567');
    });
    it('uses custom delimiter', () => {
      expect(new AutoNumberFormat('1234567').format({ delimiter: '.', suffix: '' })).toBe('1.234.567');
    });
  });

  describe('empty/null/undefined values', () => {
    it('returns default for empty string', () => {
      expect(new AutoNumberFormat('').format()).toBe('-');
    });
    it('returns defaultValue for null', () => {
      expect(new AutoNumberFormat(null).format()).toBe('-');
    });
    it('returns defaultValue for undefined', () => {
      expect(new AutoNumberFormat(undefined).format()).toBe('-');
    });
    it('returns custom defaultValue', () => {
      expect(new AutoNumberFormat('').format({ defaultValue: '0' })).toBe('0');
    });
    it('returns custom defaultValue for null', () => {
      expect(new AutoNumberFormat(null).format({ defaultValue: 'N/A' })).toBe('N/A');
    });
  });

  describe('zero handling', () => {
    it('formats zero', () => {
      expect(new AutoNumberFormat('0').format()).toBe('0');
    });
    it('formats number 0', () => {
      expect(new AutoNumberFormat(0).format()).toBe('0');
    });
    it('formats zero with precision', () => {
      expect(new AutoNumberFormat(0).format({ trimTailZero: false, precision: 3 })).toBe('0.000');
    });
    it('handles leading zeros', () => {
      expect(new AutoNumberFormat('000a').format()).toBe('0a');
    });
  });

  describe('zh_CN strategy', () => {
    it('formats 123456 to wan', () => {
      expect(new AutoNumberFormat(123456).format({ calcStrategy: 'zh_CN' })).toBe('12.35万');
    });
    it('formats 12345678 to wan', () => {
      expect(new AutoNumberFormat('12345678').format({ calcStrategy: 'zh_CN' })).toBe('1,234.57万');
    });
    it('formats with custom precision', () => {
      expect(new AutoNumberFormat(123456).format({ calcStrategy: 'zh_CN', precision: 5 })).toBe('12.3456万');
    });
  });

  describe('en_US strategy', () => {
    it('formats to K', () => {
      expect(new AutoNumberFormat('1234').format({ calcStrategy: 'en_US', suffixUpperCase: true })).toBe('1.23K');
    });
    it('formats to M', () => {
      expect(new AutoNumberFormat('123456789').format({ calcStrategy: 'en_US', suffixUpperCase: true })).toBe('123.46M');
    });
    it('lowercase suffix', () => {
      expect(new AutoNumberFormat('1234').format({ calcStrategy: 'en_US', suffixUpperCase: false })).toBe('1.23k');
    });
  });

  describe('star strategy', () => {
    it('formats to stars', () => {
      expect(new AutoNumberFormat('12345').format({ calcStrategy: 'star' })).toBe('1.23☆☆☆☆☆');
    });
    it('handles different magnitude', () => {
      expect(new AutoNumberFormat('1235').format({ calcStrategy: 'star' })).toBe('1.24☆☆☆☆');
    });
  });

  describe('scientific notation', () => {
    it('expands 1e+6', () => {
      expect(new AutoNumberFormat('1e+6').format({ calcStrategy: 'zh_CN', suffix: '' })).toBe('1,000,000');
    });
    it('expands negative exponent', () => {
      expect(new AutoNumberFormat('1.23456789E-3').format({ trimTailZero: false, precision: 3 })).toBe('0.001');
    });
    it('expands e6', () => {
      expect(new AutoNumberFormat('1e6').format({ calcStrategy: 'zh_CN', suffix: '' })).toBe('1,000,000');
    });
  });

  describe('negative numbers', () => {
    it('handles negative value', () => {
      expect(new AutoNumberFormat('-12345').format({ calcStrategy: 'zh_CN' })).toBe('-1.23万');
    });
    it('handles positive sign', () => {
      expect(new AutoNumberFormat('+1234').format()).toBe('1,234');
    });
  });

  describe('Chinese text suffix', () => {
    it('preserves Chinese suffix', () => {
      expect(new AutoNumberFormat('0你好').format()).toBe('0你好');
    });
    it('handles Chinese text suffix', () => {
      expect(new AutoNumberFormat('0 你好').format()).toBe('0你好');
    });
  });
});

describe('autoNumberFormat (function API)', () => {
  describe('direct mode: (options, value)', () => {
    it('formats with zh_CN', () => {
      expect(autoNumberFormat({ calcStrategy: 'zh_CN' }, '12345.010')).toBe('1.23万');
    });
    it('formats with custom suffix', () => {
      expect(autoNumberFormat({ suffix: '次' }, '540453')).toBe('540,453次');
    });
    it('handles negative', () => {
      expect(autoNumberFormat({ calcStrategy: 'zh_CN' }, '-12345')).toBe('-1.23万');
    });
  });

  describe('curried mode: (options)(value)', () => {
    it('returns delay function', () => {
      const fmt = autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc;
      expect(fmt('12345.010')).toBe('1.23万');
    });
    it('accepts override options', () => {
      const fmt = autoNumberFormat({ calcStrategy: 'zh_CN' }) as IDelayCalcFunc;
      expect(fmt('12345', { calcStrategy: 'en_US' })).toBe('12.35K');
    });
  });

  describe('simple mode: (value)', () => {
    it('uses default options', () => {
      expect(autoNumberFormat('1.100')).toBe('1.1');
    });
  });
});

describe('StrategyManager', () => {
  it('gets zh_CN calc strategy', () => {
    const s = StrategyManager.getStrategy('calc', 'zh_CN');
    expect(s).toBeDefined();
    expect(s!.getType()).toBe('calc');
  });
  it('gets default format strategy', () => {
    const s = StrategyManager.getStrategy('format', 'default');
    expect(s).toBeDefined();
    expect(s!.getType()).toBe('format');
  });
  it('returns undefined for unknown', () => {
    const s = StrategyManager.getStrategy('calc', 'nonexistent');
    expect(s).toBeUndefined();
  });
});
