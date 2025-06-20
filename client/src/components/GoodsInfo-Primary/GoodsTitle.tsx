import React from 'react';

interface GoodsTitleProps {
  title: string;
}

function GoodsTitle({ title }: GoodsTitleProps) {
  return (
    <h2 style={{ 
      fontSize: '16px',
      fontWeight: '400',
      margin: '10px 15px'
    }}>
      {title}
    </h2>
  );
}

export default GoodsTitle; 