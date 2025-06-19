import React, { useState, useEffect } from 'react';
import { getProduct } from '../../services/productApi';
import { Product } from '../../types/product';
import {
  GoodsBrand,
  GoodsTitle,
  GoodsPrice,
  GoodsBadges,
  GoodsReviewSummary,
  GoodsImage,
} from './index';

interface GoodsInfoPrimaryProps {
  productId?: number;
}

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  background: '#fff',
  fontSize: '16px',
  color: '#666',
};

const errorStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  background: '#fff',
  fontSize: '16px',
  color: '#ff3d3d',
};

const GoodsInfoPrimary: React.FC<GoodsInfoPrimaryProps> = ({ productId = 1 }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '상품 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div style={loadingStyle}>상품 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div style={errorStyle}>오류: {error}</div>;
  }

  if (!product) {
    return <div style={errorStyle}>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{position:'relative',background:'#fff'}}>
      <GoodsImage src={product.imageUrl} alt={product.name} />
      <GoodsBrand brand={product.brand} />
      <GoodsTitle name={product.name} />
      <GoodsPrice 
        originalPrice={product.originalPrice}
        salePrice={product.salePrice}
        discountRate={product.discountRate}
      />
      <GoodsBadges badges={product.badges} />
      <GoodsReviewSummary 
        rating={product.rating}
        reviewCount={product.reviewCount}
        iconColors={product.iconColors}
        watchingCount={product.watchingCount}
      />
    </div>
  );
};

export default GoodsInfoPrimary; 