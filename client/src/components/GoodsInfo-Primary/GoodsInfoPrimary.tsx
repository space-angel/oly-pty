import React from 'react';
import { Product } from '../../types/product';
import GoodsBadges from './GoodsBadges';
import GoodsBrand from './GoodsBrand';
import GoodsImage from './GoodsImage--Swiper';
import GoodsPrice from './GoodsPrice';
import GoodsReviewSummary from './GoodsReviewSummary';
import GoodsTitle from './GoodsTitle';

interface Props {
  product: Product;
}

const GoodsInfoPrimary: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <GoodsImage imageUrl={product.imageUrl} />
      <div>
        <GoodsBrand brand={product.brand} />
        <GoodsTitle title={product.name} />

        <GoodsPrice
          originalPrice={product.originalPrice}
          salePrice={product.salePrice}
          discountRate={product.discountRate}
        />
        <GoodsBadges badges={product.badges} />
        <GoodsReviewSummary
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>
    </div>
  );
};

export default GoodsInfoPrimary; 