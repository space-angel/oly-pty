import React from 'react';

interface OptionSelectBoxProps {
  selected: string | null;
  selectedOption: any;
  selectOpen: boolean;
  onToggle: () => void;
}

// 스타일 객체 분리
const boxStyle = {
  border: '1px solid rgb(229, 231, 234)',
  borderRadius: 4,
  height: 52,
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  marginTop: 4,
  background: '#fff',
  cursor: 'pointer',
  position: 'relative' as const,
};

const textStyle = (selected: boolean) => ({
  color: selected ? '#99a1a8' : '#99a1a8',
  fontSize: 15,
  flex: 1,
});

const arrowStyle = (selectOpen: boolean) => ({
  transform: selectOpen ? 'rotate(180deg)' : 'none',
  transition: 'transform 0.2s',
});

const OptionSelectBox: React.FC<OptionSelectBoxProps> = ({ selected, selectedOption, selectOpen, onToggle }) => (
  <div
    style={boxStyle}
    onClick={e => { e.stopPropagation(); onToggle(); }}
  >
    <span style={textStyle(!!selected)}>
      옵션을 선택해 주세요
    </span>
    <svg width="24" height="24" style={arrowStyle(selectOpen)} viewBox="0 0 24 24" fill="none">
      <path d="M6 10L12 16L18 10" stroke="#8B95A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default OptionSelectBox; 