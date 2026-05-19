import React, { useState, useMemo } from 'react';
import { AutoNumberFormat } from '../../src/index';

const strategies = [
  { label: 'zh_CN (万/亿)', value: 'zh_CN' },
  { label: 'en_US (K/M/B)', value: 'en_US' },
  { label: 'star (星级)', value: 'star' },
];

const containerStyle: React.CSSProperties = {
  maxWidth: 780, margin: '0 auto', fontFamily: 'system-ui, sans-serif',
};
const cardStyle: React.CSSProperties = {
  background: '#fff', borderRadius: 8, padding: 20, marginBottom: 16,
  boxShadow: '0 1px 3px rgba(0,0,0,.1)',
};
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: 12, fontSize: 14, color: '#333' };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', fontSize: 14, border: '1px solid #d9d9d9',
  borderRadius: 4, boxSizing: 'border-box',
};
const selectStyle: React.CSSProperties = {
  padding: '6px 8px', fontSize: 13, border: '1px solid #d9d9d9', borderRadius: 4,
  background: '#fff',
};
const resultStyle: React.CSSProperties = {
  marginTop: 20, padding: 16, background: '#f6f8fa', borderRadius: 6,
  fontSize: 18, fontWeight: 600, color: '#1a1a2e', textAlign: 'center',
  fontFamily: 'Menlo, Monaco, monospace',
};

export default function Playground() {
  const [value, setValue] = useState('123456789');
  const [calcStrategy, setCalcStrategy] = useState('zh_CN');
  const [precision, setPrecision] = useState('2');
  const [trimTailZero, setTrimTailZero] = useState(true);
  const [delimiter, setDelimiter] = useState(',');
  const [suffix, setSuffix] = useState('');
  const [space, setSpace] = useState(false);
  const [suffixUpperCase, setSuffixUpperCase] = useState(false);

  const result = useMemo(() => {
    try {
      const inst = new AutoNumberFormat(value, {
        calcStrategy: calcStrategy as any,
        precision: parseInt(precision) || 2,
        trimTailZero,
        delimiter: delimiter || false,
        suffix: suffix || undefined,
        space,
        suffixUpperCase,
      });
      return inst.format();
    } catch {
      return '(输入无效)';
    }
  }, [value, calcStrategy, precision, trimTailZero, delimiter, suffix, space, suffixUpperCase]);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <label style={labelStyle}>
          输入数值
          <input
            style={inputStyle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 123456789, 1.5e6, 12px, 35%"
          />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={cardStyle}>
          <label style={labelStyle}>
            计算策略
            <select
              style={{ ...selectStyle, width: '100%', marginTop: 4 }}
              value={calcStrategy}
              onChange={(e) => setCalcStrategy(e.target.value)}
            >
              {strategies.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={cardStyle}>
          <label style={labelStyle}>
            精度 (precision)
            <input
              style={{ ...inputStyle, marginTop: 4 }}
              type="number"
              min="0"
              max="10"
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={cardStyle}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={trimTailZero}
              onChange={(e) => setTrimTailZero(e.target.checked)}
            />
            去除末尾零
          </label>
        </div>
        <div style={cardStyle}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={space}
              onChange={(e) => setSpace(e.target.checked)}
            />
            添加空格
          </label>
        </div>
        <div style={cardStyle}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={suffixUpperCase}
              onChange={(e) => setSuffixUpperCase(e.target.checked)}
            />
            后缀大写
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={cardStyle}>
          <label style={labelStyle}>
            千分位分隔符
            <select
              style={{ ...selectStyle, width: '100%', marginTop: 4 }}
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
            >
              <option value=",">逗号 (,)</option>
              <option value=".">点 (.)</option>
              <option value=" ">空格 ( )</option>
              <option value="">禁用</option>
            </select>
          </label>
        </div>
        <div style={cardStyle}>
          <label style={labelStyle}>
            自定义后缀
            <input
              style={{ ...inputStyle, marginTop: 4 }}
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="留空则自动判断"
            />
          </label>
        </div>
      </div>

      <div style={{ ...cardStyle, textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>输出结果</div>
        <div style={resultStyle}>{result}</div>
      </div>
    </div>
  );
}
