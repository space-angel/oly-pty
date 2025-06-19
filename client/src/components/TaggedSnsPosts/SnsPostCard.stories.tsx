import React from 'react';
import SnsPostCard from './SnsPostCard';

export default {
  title: 'TaggedSnsPosts/SnsPostCard',
  component: SnsPostCard,
};

export const Default = () => (
  <SnsPostCard
    image="https://via.placeholder.com/220x140"
    tag="#뷰티"
    title="예쁜 립스틱 후기"
    desc="색감이 너무 예쁘고 발림성도 좋아요!"
    likes={42}
  />
); 