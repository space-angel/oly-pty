import React from 'react';

interface OptionListProps {
  options: any[];
  onSelectOption: (key: string) => void;
}

// 스타일 객체 분리
const listContainerStyle = {
  maxHeight: 260,
  overflowY: 'auto' as const,
  marginBottom: 12,
};

const optionItemStyle = (soldout: boolean) => ({
  padding: '18px 0 12px 0',
  borderBottom: '1px solid #F1F3F5',
  cursor: soldout ? 'not-allowed' : 'pointer',
  opacity: soldout ? 0.5 : 1,
  display: 'flex',
  alignItems: 'center',
});

const flagStyle = (flag: string) => ({
  fontSize: 10,
  color: flag === '오늘드림' ? '#F48FB1' : '#B0B8C1',
  background: '#FDF0F6',
  borderRadius: 4,
  padding: '2px 8px',
  fontWeight: 500,
  marginRight: 6,
});

const soldoutTagStyle = {
  fontSize: 10,
  color: '#fff',
  background: '#757d86',
  borderRadius: 4,
  padding: '2px 4px',
  fontWeight: 500,
};

const restockButtonStyle = {
  border: '1px solid #e5e7ea',
  background: '#fff',
  color: '#131518',
  borderRadius: 4,
  padding: '9px 12px',
  fontSize: 13,
  fontWeight: 500,
  marginLeft: 8,
  cursor: 'pointer',
};

// 옵션 항목 컴포넌트 분리
const OptionItem: React.FC<{
  opt: any;
  onSelect: (key: string) => void;
}> = ({ opt, onSelect }) => (
  <div
    key={opt.key}
    style={optionItemStyle(opt.soldout)}
    onClick={() => !opt.soldout && onSelect(opt.key)}
  >
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 400, fontSize: 14, color: opt.soldout ? '#B0B8C1' : '#131518' }}>{opt.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
        <span style={{ color: '#FF5A5A', fontWeight: 700, fontSize: 14, marginRight: 6 }}>{opt.rate}%</span>
        <span style={{ fontWeight: 700, fontSize: 14, marginRight: 6 }}>{opt.price.toLocaleString()}원</span>
        {opt.soldout && <span style={soldoutTagStyle}>일시품절</span>}
      </div>
    </div>
    {opt.soldout && <button style={{ ...restockButtonStyle, opacity: 1 }}>재입고 알림</button>}
  </div>
);

const OptionList: React.FC<OptionListProps> = ({ options, onSelectOption }) => (
  <div style={listContainerStyle}>
    {options.map(opt => (
      <OptionItem key={opt.key} opt={opt} onSelect={onSelectOption} />
    ))}
  </div>
);

export default OptionList; 