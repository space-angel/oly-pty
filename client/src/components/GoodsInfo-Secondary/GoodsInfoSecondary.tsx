import React from 'react';
import {
  InfoListItem,
  StoreSearchBtn,
} from './index';

const GoodsInfoSecondary= () => (
  <div style={{position:'relative',background:'#fff'}}>
    <InfoListItem 
      title="일반배송"
      price="2,500원 (20,000원 이상 무료배송)"
      desc="평균 4일 이내 도착"/>
    <InfoListItem
      title="오늘드림"
      price="2,500원 또는 5,000원 (3만원 이상 무료)"
      desc="지금 주문하면 오늘 받을 수 있어요!"
      isStrongDesc
    />
    <InfoListItem title="픽업" price="무료" desc="" />
    <StoreSearchBtn />
  </div>
);

export default GoodsInfoSecondary; 