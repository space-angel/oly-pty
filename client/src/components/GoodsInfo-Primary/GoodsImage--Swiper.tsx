import React from 'react';

interface GoodsImageProps {
  imageUrl: string;
}

function GoodsImage({ imageUrl }: GoodsImageProps) {
  return (
    <div>
      <img src={imageUrl} alt="상품 이미지" style={{ width: '100%' }} />
    </div>
  );
}

export default GoodsImage;