import React from 'react';


interface GoodsWatchingCountProps {
  count: number;
}

function GoodsWatchingCount({ count }: GoodsWatchingCountProps) {
  return (
    <div style={{ 
      fontSize: '12px',
      color: '#666',
      margin: '8px 0',
      padding: '0 15px'
    }}>
      {count}명이 보고 있어요
    </div>
  );
}

export default GoodsWatchingCount; 