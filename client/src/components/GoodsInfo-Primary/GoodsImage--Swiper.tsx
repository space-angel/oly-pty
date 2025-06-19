import React from 'react';

interface GoodsImageProps {
    src?: string;
    alt?: string;
    style?: React.CSSProperties;
  }
  
  const DEFAULT_IMAGE = 'https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0022/A00000022721303ko.jpg?qt=80';

  const GoodsImage: React.FC<GoodsImageProps> = ({ src = DEFAULT_IMAGE, alt = '상품 이미지', style }) => (
    <div style={{ width: '100%', display: 'flex' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', objectFit: 'cover', ...style }}
      />
    </div>
  );

  export default GoodsImage;