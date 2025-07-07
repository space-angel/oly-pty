import React, { useEffect } from 'react';
import { track as amplitudeTrack } from '@amplitude/analytics-browser';

interface BuyBottomButtonsProps {
  today: boolean;
  onTodayChange: (checked: boolean) => void;
  giftSvg: React.ReactNode;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const checkboxRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const giftButtonStyle: React.CSSProperties = {
  flex: 0.5,
  background: '#fff',
  border: 'none',
  lineHeight: '14px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0px 0px 0px 8px',
  margin: '0px 7px 0px 12px',
  gap: 1,
  color: '#50585f',
};

const cartButtonStyle: React.CSSProperties = {
  flex: 2,
  background: '#fff',
  border: '1px solid #222',
  borderRadius: 4,
  height: 48,
  fontWeight: 700,
  fontSize: 16,
  color: '#222',
};

const buyButtonStyle: React.CSSProperties = {
  flex: 2,
  background: '#222',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  height: 48,
  fontWeight: 700,
  fontSize: 16,
};

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  padding: '0px 11px 12px 0px',
};

const customCheckboxStyle: React.CSSProperties = {
  position: 'relative',
  width: 20,
  height: 20,
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: '11px 15px 12px 15px',
};
const hiddenCheckboxStyle: React.CSSProperties = {
  opacity: 0,
  width: 20,
  height: 20,
  position: 'absolute',
  left: 0,
  top: 0,
  margin: 0,
  cursor: 'pointer',
};

const svgDefault = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.500488' width='19' height='19' rx='1.5' fill='white' stroke='%23C9CDD2'/%3E%3C/svg%3E";
const svgChecked = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.500488' width='19' height='19' rx='1.5' fill='white' stroke='%2382DC28' strokeWidth='2'/%3E%3Cpath d='M6 10.5L9 13.5L14 8.5' stroke='%2382DC28' strokeWidth='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const BuyBottomButtons: React.FC<BuyBottomButtonsProps> = ({ today, onTodayChange, giftSvg }) => {
  // 구매/장바구니 버튼 클릭 핸들러
  const handlePurchaseClick = (buttonType: 'cart' | 'buy') => {
    amplitudeTrack('purchase_button_click', {
      button_type: buttonType,
      timestamp: Date.now(),
      user_id: null, // TODO: 실제 유저 정보 연동 시 교체
      product_id: null // TODO: 실제 상품 정보 연동 시 교체
    });
    if (buttonType === 'cart') {
      alert('장바구니에 담았습니다!');
    } else {
      alert('구매하기 버튼을 클릭하였습니다!');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={checkboxRowStyle}>
        <span style={customCheckboxStyle}>
          <input
            type="checkbox"
            id="todayDelivery"
            checked={today}
            onChange={e => onTodayChange(e.target.checked)}
            style={hiddenCheckboxStyle}
          />
          <img
            src={today ? svgChecked : svgDefault}
            alt="체크박스"
            width={20}
            height={20}
            style={{ display: 'block', pointerEvents: 'none' }}
          />
        </span>
        <label htmlFor="todayDelivery" style={{ fontSize: 14, color: 'rgb(19, 21, 24)' }}>
          오늘드림으로 받아 보시겠어요?
        </label>
      </div>
      <div style={buttonRowStyle}>
        <button style={giftButtonStyle}>
          {giftSvg}
          <span style={{ fontSize: 12, color: 'rgb(80, 88, 95)', fontWeight: 400 }}>선물</span>
        </button>
        <button style={cartButtonStyle} onClick={() => handlePurchaseClick('cart')}>
          장바구니
        </button>
        <button style={buyButtonStyle} onClick={() => handlePurchaseClick('buy')}>
          바로구매
        </button>
      </div>
    </div>
  );
};

export default BuyBottomButtons; 