import React, { useEffect, useState } from 'react';
import './App.css';
import { productApi } from './services/productApi';
import { Product } from './types/product';
import ReviewTab from "./components/ReviewTab";
import TopTab from "./components/TopTab";
import GoodsInfoPrimary from './components/GoodsInfo-Primary/GoodsInfoPrimary';
import GoodsInfoSecondary from './components/GoodsInfo-Secondary/GoodsInfoSecondary';
import HeaderBar from './components/HeaderBar';

const HEADER_HEIGHT = 56;

function App() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productApi.getProducts();
        if (products && products.length > 0) {
          setSelectedProduct(products[0]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError(error instanceof Error ? error.message : '상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="App">
      <HeaderBar onVisibleChange={setHeaderVisible} />
      <div style={{height:56,background:'#fff'}}>  </div>
      <GoodsInfoPrimary product={selectedProduct} />
      <div style={{height: 0, background: '#F6F7F9', borderBottom: '1px solid #F6F7F9',margin:'18px 0'}}></div>
      <GoodsInfoSecondary />
      <div style={{height: 6, background: '#F6F7F9', borderBottom: '1px solid #F6F7F9'}}></div>
      <TopTab stickyTop={headerVisible ? HEADER_HEIGHT : 0} />
      <ReviewTab product={selectedProduct} />
    </div>
  );
}

export default App;
