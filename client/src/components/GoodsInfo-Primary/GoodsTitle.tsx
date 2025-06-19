import React from 'react';

interface GoodsTitleProps {
  name?: string;
}

const GoodsTitle: React.FC<GoodsTitleProps> = ({ 
  name = "[6월 올영픽/NEW] 클리오 킬 커버 메쉬 블러 쿠션 (+파우더 팩트 증정)" 
}) => (
  <div style={{
    fontSize: 16,
    fontWeight: 400,
    color: '##131518',
    lineHeight: '22px',
    marginBottom: 8,
    padding: '0 15px',
  }}>
    {name}
  </div>
);

export default GoodsTitle; 