import React from 'react';

interface InfoListItemProps {
  title: string;
  price: string;
  desc: string;
  isStrongDesc?: boolean;
  onClick?: () => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '16px 15px',
  cursor: 'pointer',
  letterSpacing: -0.2,
};

const leftStyle: React.CSSProperties = {
  minWidth: 72,
  fontSize: 13,
  fontWeight: 400,
  flexShrink: 0,
  color: '#757d86',
  lineHeight: '16px',
};

const rightStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  fontSize: 15,
  color: '#222',
  fontWeight: 400,
  lineHeight: '22px',
};

const priceStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'rgb(80, 88, 95)',
  fontWeight: 400,
  lineHeight: '16px',
};

const descStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'rgb(19, 21, 24)',
  fontWeight: 400,
  lineHeight: '16px',
};

const arrowStyle: React.CSSProperties = {
  marginLeft: 8,
  marginTop: 2,
  flexShrink: 0,
};

const InfoListItem: React.FC<InfoListItemProps> = ({ title, price, desc, isStrongDesc, onClick }) => (
  <div style={containerStyle} onClick={onClick}>
    <div style={leftStyle}>{title}</div>
    <div style={rightStyle}>
      <span style={priceStyle}>{price}</span>
      <span style={descStyle}>{isStrongDesc ? <strong>{desc}</strong> : desc}</span>
    </div>
    <span style={arrowStyle}>
      <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M6.83007 11.8801L6.07007 11.0901L10.3101 6.9901L6.07007 2.8901L6.83007 2.1001L11.8901 6.9901L6.83007 11.8801Z' fill='#99A1A8'/>
      </svg>
    </span>
  </div>
);

export default InfoListItem;
