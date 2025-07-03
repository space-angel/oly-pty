import React from 'react';

interface SelectedOptionListProps {
  selectedOptions: any[];
  onRemove: (key: string) => void;
  onChangeCount: (key: string, diff: number) => void;
  listContainerStyle: React.CSSProperties;
  listContainerScrollStyle: React.CSSProperties;
  listItemStyle: React.CSSProperties;
  listItemBorderStyle: React.CSSProperties;
  rowStyle: React.CSSProperties;
  optionInfoStyle: React.CSSProperties;
  badgeStyle: React.CSSProperties;
  priceStyle: React.CSSProperties;
  removeBtnStyle: React.CSSProperties;
  qtyRowStyle: React.CSSProperties;
  qtyBoxStyle: React.CSSProperties;
  qtyBtnStyle: React.CSSProperties;
  qtyNumStyle: React.CSSProperties;
}

const SelectedOptionList: React.FC<SelectedOptionListProps> = ({
  selectedOptions, onRemove, onChangeCount,
  listContainerStyle, listContainerScrollStyle, listItemStyle, listItemBorderStyle, rowStyle, optionInfoStyle, badgeStyle, priceStyle, removeBtnStyle, qtyRowStyle, qtyBoxStyle, qtyBtnStyle, qtyNumStyle
}) => (
  <div style={selectedOptions.length >= 3 ? listContainerScrollStyle : listContainerStyle}>
    {selectedOptions.map((item, idx) => (
      <div
        key={item.key}
        style={
          idx !== selectedOptions.length - 1
            ? { ...listItemStyle, ...listItemBorderStyle }
            : listItemStyle
        }
      >
        {/* 상단: 옵션명, 뱃지, 가격, x버튼 */}
        <div style={rowStyle}>
          <div style={optionInfoStyle}>
            <span
              style={{
                fontWeight: 400,
                fontSize: 14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                fontSize: 10,
                background: '#FDF0F6',
                color: item.flag === '오늘드림' ? '#F48FB1' : '#B0B8C1',
                borderRadius: 4,
                padding: '2px 8px',
                fontWeight: 500,
                marginRight: 6,
              }}
            >
              {item.flag}
            </span>
          </div>
          <div style={rowStyle}>
            <span style={priceStyle}>
              {(item.price * item.count).toLocaleString()}원
            </span>
            <button
              onClick={() => onRemove(item.key)}
              style={removeBtnStyle}
              onMouseOver={e => (e.currentTarget.style.background = '#F5F5F5')}
              onMouseOut={e => (e.currentTarget.style.background = 'none')}
              aria-label="삭제"
            >
              ×
            </button>
          </div>
        </div>
        {/* 하단: 수량조절 */}
        <div style={qtyRowStyle}>
          <div style={qtyBoxStyle}>
            <button
              onClick={() => onChangeCount(item.key, -1)}
              style={qtyBtnStyle}
            >
              -
            </button>
            <span style={qtyNumStyle}>{item.count}</span>
            <button
              onClick={() => onChangeCount(item.key, 1)}
              style={qtyBtnStyle}
            >
              +
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SelectedOptionList; 