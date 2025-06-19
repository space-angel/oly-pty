// LikeCount atom: 좋아요 수 컴포넌트
// 아토믹 디자인 - Atoms
// ---------------------------------------------
//
import React from "react";

type LikeCountProps = {
  count: number;
  style?: React.CSSProperties;
};

const LikeCount = ({ count, style }: LikeCountProps) => (
  <div style={{ color: "#6b7280", fontSize: 15, display: "flex", alignItems: "center", ...style }}>
    <span style={{ fontSize: 18, marginRight: 4 }}>♡</span>{count}
  </div>
);

export default LikeCount;