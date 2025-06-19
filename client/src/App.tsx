import React, { useState } from 'react';
import './App.css';
import ReviewTab from "./components/ReviewTab";
import TopTab from "./components/TopTab";
import HeaderBar, { HEADER_HEIGHT } from "./components/HeaderBar";
import GoodsInfoPrimary from "./components/GoodsInfo-Primary/GoodsInfoPrimary";
import GoodsInfoSecondary from "./components/GoodsInfo-Secondary/GoodsInfoSecondary";

function App() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const productId = 1; // 실제로는 URL 파라미터나 상태에서 가져올 수 있습니다

  return (
    <div className="App" >
      <HeaderBar onVisibleChange={setHeaderVisible} />
      <div style={{height:56,background:'#fff'}}>  </div>
        <GoodsInfoPrimary productId={productId} />
        <GoodsInfoSecondary />
        <div style={{height:6,background:'#F6F7F9',borderBottom:'1px solid #F6F7F9'}}>  </div>
      <TopTab stickyTop={headerVisible ? HEADER_HEIGHT : 0} />
      <ReviewTab productId={productId} />
    </div>
  );
}

export default App;
