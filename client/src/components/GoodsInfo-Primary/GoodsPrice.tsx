import React from 'react';
import GoodsCouponButton from './GoodsCouponButton';

interface GoodsPriceProps {
  originalPrice?: number;
  salePrice?: number;
  discountRate?: number;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  marginBottom: 8,
  padding: '0 15px',
  
};

const originalPriceStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#bbb',
  textDecoration: 'line-through',
  fontWeight: 400,
  lineHeight: 1.2,
};

const priceRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop : 3,
};
const salePriceRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 3,
};

const discountStyle: React.CSSProperties = {
  fontSize: 22,
  color: '#FF3D3D',
  fontWeight: 700,
  height:25,
  marginRight: 8,

};

const salePriceStyle: React.CSSProperties = {
  fontSize: 22,
  color: '#222',
  fontWeight: 700,
  height:25,


};

const wonStyle: React.CSSProperties = {
  fontSize: 16,
  color: '#222',
  fontWeight: 400,
  marginRight: 4,
  lineHeight: '20px',
  
};

const benefitStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#868B94',
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  marginLeft: 2,
  gap: 4,
  paddingTop : 8
};

const GoodsPrice: React.FC<GoodsPriceProps> = ({ 
  originalPrice = 36000, 
  salePrice = 27000, 
  discountRate = 25 
}) => (
  <div style={containerStyle}>
    <div>
      <span style={originalPriceStyle}>{originalPrice.toLocaleString()}원</span>
    </div>
    <div style={priceRowStyle}>
      <span style={discountStyle}>{discountRate}%</span>
      <div style={salePriceRowStyle}>
      <span style={salePriceStyle}>{salePrice.toLocaleString()}</span>
      <span style={wonStyle}>원 ~</span>
      </div>

      <span style={benefitStyle}>
        혜택
        <span>
        <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_9891_7728)'>
            <path fillRule='evenodd' clipRule='evenodd' d='M7 0.65625C3.49644 0.65625 0.65625 3.49644 0.65625 7C0.65625 10.5036 3.49644 13.3438 7 13.3438C10.5036 13.3438 13.3438 10.5036 13.3438 7C13.3438 3.49644 10.5036 0.65625 7 0.65625ZM6.49449 3.91307H7.51655V4.93511H6.49449V3.91307ZM7.51655 5.95713H6.49449V10.0453H7.51655V5.95713Z' fill='#B2B8BE'/>
          </g>
          <defs>
            <clipPath id='clip0_9891_7728'>
              <rect width='14' height='14' fill='white'/>
            </clipPath>
          </defs>
        </svg>
        </span>
      </span>

      <GoodsCouponButton />
      
    </div>
  </div>
);

export default GoodsPrice; 