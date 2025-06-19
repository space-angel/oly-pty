import React from 'react';
import GoodsWatchingCount from './GoodsWatchingCount';

interface GoodsReviewSummaryProps {
  rating?: number;
  reviewCount?: number;
  iconColors?: string[];
  watchingCount?: number;
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
  padding: '0 15px',
};

const ratingStyle = {
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontWeight: 400,
};

const ratingIconsContainerStyle = {
  display: 'flex',
};

const ratingIconStyle = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: -12,
  border: '1px solid #fff',
};

const ratingIconPlusStyle = {
  ...ratingIconStyle,
  background: '#eee',
  lineHeight: '24px',
  fontSize: 16,
  color: '#868B94',
};

const StarSvg = () => (
  <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg' style={{marginRight:2,verticalAlign:'middle'}}>
    <path fillRule='evenodd' clipRule='evenodd' d='M3.3458 3.2025L0.391968 3.69013L0.349417 3.70008C0.131091 3.76697 0.0528096 4.04823 0.220445 4.21802L2.32372 6.34833L1.87454 9.30879L1.87085 9.35233C1.86701 9.58065 2.11031 9.74201 2.32359 9.63505L4.99997 8.29292L7.67634 9.63505L7.71662 9.65201C7.93257 9.72622 8.16122 9.54468 8.12539 9.30879L7.6758 6.34833L9.77949 4.21802L9.80806 4.18496C9.94537 4.00251 9.84338 3.72895 9.60796 3.69013L6.65372 3.2025L5.2775 0.543856C5.16097 0.318715 4.83896 0.318715 4.72244 0.543856L3.3458 3.2025Z' fill='#131518'/>
  </svg>
);

const IconPlus = () => (
  <svg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='1' y='0.5' width='25' height='25' rx='12.5' fill='#F0F1F4'/>
    <path d='M9.79297 13.5366V12.4292H12.8555V9.29834H13.9629V12.4292H17.0254V13.5366H13.9629V16.6675H12.8555V13.5366H9.79297Z' fill='#757D86'/>
    <rect x='1' y='0.5' width='25' height='25' rx='12.5' stroke='white'/>
  </svg>
);

const GoodsReviewSummary: React.FC<GoodsReviewSummaryProps> = ({
  rating = 4.6,
  reviewCount = 405,
  iconColors = ['#e5cfc7', '#e5d7d0'],
  watchingCount = 141,
}) => (
  <div>
    <div style={containerStyle}>
      <span style={ratingStyle}>
        <StarSvg />
        {rating} | 리뷰 {reviewCount.toLocaleString()}건
      </span>
      <span style={ratingIconsContainerStyle}>
        {iconColors.map((color, idx) => (
          <span key={color+idx} style={{ ...ratingIconStyle, background: color }}></span>
        ))}
        <span style={ratingIconPlusStyle}>
          <IconPlus />
        </span>
      </span>
      
    </div>

    <GoodsWatchingCount watchingCount={watchingCount} />
    
  </div>
);

export default GoodsReviewSummary;