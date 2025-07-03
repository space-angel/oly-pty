import React, { useState, useEffect } from 'react';
import OptionSelectBox from './GoodsBuyBottomSheet/OptionSelectBox';
import OptionList from './GoodsBuyBottomSheet/OptionList';
import SelectedOptionList from './GoodsBuyBottomSheet/SelectedOptionList';
import BuyBottomButtons from './GoodsBuyBottomSheet/BuyBottomButtons';

const options = [
  { key: '21C 란제리', title: '[파우더팩트 기획] 21C 란제리', rate: 25, price: 27000, flag: '오늘드림', soldout: false },
  { key: '21N 리넨', title: '[파우더팩트 기획] 21N 리넨', rate: 25, price: 27000, flag: '오늘드림', soldout: false },
  { key: '19C 라이트', title: '[파우더팩트 기획] 19C 라이트', rate: 25, price: 27000, flag: '오늘드림', soldout: false },
  { key: '19N 포슬린', title: '[파우더팩트 기획] 19N 포슬린', rate: 25, price: 27000, flag: '오늘드림', soldout: false },
  { key: '23N 진저', title: '[파우더팩트 기획] 23N 진저', rate: 25, price: 27000, flag: '일시품절', soldout: true },
];

const openBarSvg = `url("data:image/svg+xml,%3Csvg width='35' height='8' viewBox='0 0 35 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.620775 1.03858C0.987058 0.211232 2.0758 -0.207954 3.05256 0.102301L17.5 4.69138L31.9474 0.102301C32.9242 -0.207954 34.0129 0.211232 34.3792 1.03858C34.7455 1.86593 34.2506 2.78814 33.2739 3.09839L18.1632 7.89813C17.7356 8.03396 17.2644 8.03396 16.8368 7.89813L1.72613 3.09839C0.749377 2.78814 0.254493 1.86593 0.620775 1.03858Z' fill='%23E5E7EA'/%3E%3C/svg%3E")`;

const giftSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8699 6.00049C19.1796 5.58715 19.364 5.06806 19.364 4.50042C19.364 2.94774 18.0554 2.00049 16.8432 2.00049C16.1889 2.00049 15.5346 2.29887 15.0786 2.75052L12.0004 6.00049L8.92208 2.75052C8.46665 2.25033 7.81185 2.00049 7.15755 2.00049C5.94531 2.00049 4.63672 2.95233 4.63672 4.50042C4.63672 5.06806 4.82116 5.58715 5.13079 6.00049" stroke="#131518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="6.00049" width="18" height="16" stroke="#131518" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 6.00049V22.0005" stroke="#131518" strokeWidth="1.8" strokeLinecap="square"/>
  </svg>
);

const ArrowSvg = ({ open }: { open: boolean }) => (
  <svg
    width="35"
    height="8"
    viewBox="0 0 35 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s',
      display: 'block',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.620775 6.96142C0.987058 7.78877 2.0758 8.20795 3.05256 7.8977L17.5 3.30862L31.9474 7.8977C32.9242 8.20795 34.0129 7.78877 34.3792 6.96142C34.7455 6.13407 34.2506 5.21186 33.2739 4.90161L18.1632 0.10187C17.7356 -0.03396 17.2644 -0.03396 16.8368 0.10187L1.72613 4.90161C0.749377 5.21186 0.254493 6.13407 0.620775 6.96142Z"
      fill="#E5E7EA"
    />
  </svg>
);

// 스타일 상수 분리
const listContainerStyle = {
  padding: '0 16px',
  marginBottom: 12,
};
const listContainerScrollStyle = {
  ...listContainerStyle,
  maxHeight: 260,
  overflowY: 'auto' as const,
};
const listItemStyle = {
  padding: '20px 0 12px 0',
  background: '#fff',
};
const listItemBorderStyle = {
  borderBottom: '1px solid #F1F3F5',
};
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
};
const optionInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
  flex: 1,
};
const badgeStyle = {
  fontSize: 13,
  background: '#FDF0F6',
  borderRadius: 4,
  padding: '2px 8px',
  fontWeight: 500,
};
const priceStyle = {
  fontWeight: 700,
  fontSize: 17,
  color: '#222',
  minWidth: 80,
  textAlign: 'right' as const,
};
const removeBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 26,
  color: '#B0B8C1',
  fontWeight: 700,
  width: 36,
  height: 36,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
};
const qtyRowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 14,
};
const qtyBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #E5E7EA',
  borderRadius: 6,
  height: 40,
};
const qtyBtnStyle = {
  width: 40,
  height: 40,
  border: 'none',
  background: '#fff',
  fontSize: 22,
  fontWeight: 700,
  borderRadius: 6,
  cursor: 'pointer',
};
const qtyNumStyle = {
  width: 32,
  textAlign: 'center' as const,
  fontSize: 16,
  fontWeight: 700,
};
const summaryRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 15px 20px 15px',
  fontSize: 14,
  fontWeight: 500,
  borderBottom: '1px solid rgb(241, 243, 245)',
};
const summaryLabelStyle = {
  color: '#222',
};
const summaryPriceStyle = {
  color: '#222',
  fontWeight: 700,
};

// Props 타입 추가
interface GoodsBuyBottomSheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoodsBuyBottomSheet = ({ open, setOpen }: GoodsBuyBottomSheetProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [today, setToday] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{ key: string; title: string; price: number; count: number; flag: string }[]>([]);
  const selectedOption = options.find(opt => opt.key === selected);

  // 옵션 리스트에서 수량 조절
  const handleChangeSelectedCount = (key: string, diff: number) => {
    setSelectedOptions(prev => prev.map(item =>
      item.key === key ? { ...item, count: Math.max(1, item.count + diff) } : item
    ));
  };

  // 옵션 리스트에서 삭제
  const handleRemoveSelected = (key: string) => {
    setSelectedOptions(prev => prev.filter(item => item.key !== key));
  };

  // 옵션 선택 시 리스트에 추가
  const handleSelectOption = (key: string) => {
    const opt = options.find(o => o.key === key);
    if (!opt || opt.soldout) return;
    setSelected(key);
    setCount(1);
    setSelectOpen(false);
    setSelectedOptions(prev => {
      const existIdx = prev.findIndex(item => item.key === key);
      if (existIdx !== -1) {
        // 이미 있으면 수량만 1 증가
        return prev.map((item, idx) => idx === existIdx ? { ...item, count: item.count + 1 } : item);
      }
      // 없으면 새로 추가
      return [...prev, { key: opt.key, title: opt.title, price: opt.price, count: 1, flag: opt.flag }];
    });
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* 바텀시트 전체 */}
      <div style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1100,
        background: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16,
        boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.08)',
        padding: 0, overflow: 'hidden',
      }}>
        {/* 상단 화살표 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 36, cursor: 'pointer', userSelect: 'none' }} onClick={() => setOpen(o => !o)}>
          <ArrowSvg open={open} />
        </div>
        {/* 옵션 시트 */}
        {open && (
          <div style={{ padding: '0 16px 0 16px' }}>
            {/* 옵션 선택 영역 */}
            <OptionSelectBox
              selected={selected}
              selectedOption={selectedOption}
              selectOpen={selectOpen}
              onToggle={() => setSelectOpen(prev => !prev)}
            />
            {/* 옵션 리스트: selectOpen이 true일 때만 노출 */}
            {selectOpen && (
              <OptionList options={options} onSelectOption={handleSelectOption} />
            )}
          </div>
        )}
        {/* 선택 옵션 리스트 */}
        {open && selectedOptions.length > 0 && !selectOpen && (
          <SelectedOptionList
            selectedOptions={selectedOptions}
            onRemove={handleRemoveSelected}
            onChangeCount={handleChangeSelectedCount}
            listContainerStyle={listContainerStyle}
            listContainerScrollStyle={listContainerScrollStyle}
            listItemStyle={listItemStyle}
            listItemBorderStyle={listItemBorderStyle}
            rowStyle={rowStyle}
            optionInfoStyle={optionInfoStyle}
            badgeStyle={badgeStyle}
            priceStyle={priceStyle}
            removeBtnStyle={removeBtnStyle}
            qtyRowStyle={qtyRowStyle}
            qtyBoxStyle={qtyBoxStyle}
            qtyBtnStyle={qtyBtnStyle}
            qtyNumStyle={qtyNumStyle}
          />
        )}
        {/* 선택 옵션 합계/수량 */}
        {open && !selectOpen && (
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>
              구매수량 {selectedOptions.reduce((sum, item) => sum + item.count, 0)}개
            </span>
            <span style={summaryPriceStyle}>
              총 {selectedOptions.reduce((sum, item) => sum + item.count * item.price, 0).toLocaleString()}원
            </span>
          </div>
        )}
        {/* 오늘드림/버튼 영역 */}
        <BuyBottomButtons today={today} onTodayChange={setToday} giftSvg={giftSvg} />
      </div>
    </>
  );
};

export default GoodsBuyBottomSheet; 