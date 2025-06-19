import React from 'react';

const watchingCountStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#868B94',
  padding: '0 15px 27px 15px',
  fontWeight: 400,
  marginTop: 4,
  lineHeight: '14px',
  borderBottom: '1px solid #E5E5E5',
};

interface GoodsWatchingCountProps {
  watchingCount?: number;
}

const GoodsWatchingCount: React.FC<GoodsWatchingCountProps> = ({ watchingCount = 141 }) => (
  <div style={watchingCountStyle}>{watchingCount.toLocaleString()}명이 보고 있어요</div>
);

export default GoodsWatchingCount; 