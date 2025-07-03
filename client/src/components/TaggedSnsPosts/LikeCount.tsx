import React from "react";

type LikeCountProps = {
  count: number;
  style?: React.CSSProperties;
};

const LikeCount = ({ count, style }: LikeCountProps) => (
  <div style={{ color: "#757d86", fontSize: 13, display: "flex", alignItems: "center", ...style }}>
    <span style={{ fontSize: 16, marginRight: 2, color: "#757d86" }}>♡</span>{count}
  </div>
);

export default LikeCount;