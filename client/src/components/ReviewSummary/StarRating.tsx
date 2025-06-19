// StarRating molecule: 별점 묶음 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";
import Star from "./Star";

type StarRatingProps = {
  count?: number;
  value?: number;
  style?: React.CSSProperties;
  starStyle?: React.CSSProperties;
};

const StarRating = ({ count = 5, value = 0, style, starStyle }: StarRatingProps) => (
  <div style={style}>
    {Array.from({ length: count }).map((_, i) => {
      let fill: 0 | 0.5 | 1 = 0;
      if (value >= i + 1) fill = 1;
      else if (value >= i + 0.5) fill = 0.5;
      else fill = 0;
      return <Star key={i} style={starStyle} fill={fill} />;
    })}
  </div>
);

export default StarRating; 