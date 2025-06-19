// Star atom: 별 아이콘 컴포넌트
// 아토믹 디자인 - Atoms
// ---------------------------------------------
//
import React from "react";

type StarProps = {
  style?: React.CSSProperties;
  fill?: 0 | 0.5 | 1;
};

const Star = ({ style, fill = 1 }: StarProps) => {
  const starColor = fill === 0 ? '#E5E7EA' : style?.color || '#FF5753';
  return (
    <span style={{
      ...style,
      position: 'relative',
      display: 'inline-block',
      color: starColor,
      WebkitTextStroke: `1px ${starColor}`,
    }} role="img" aria-label="별">
      <span style={{
        visibility: fill === 0 ? 'visible' : 'hidden',
        color: '#E5E7EA',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        WebkitTextStroke: `1px ${starColor}`,
      }}>★</span>
      <span style={{
        width: fill === 1 ? '100%' : fill === 0.5 ? '50%' : '0%',
        overflow: 'hidden',
        display: 'inline-block',
        position: 'absolute',
        left: 0,
        top: 0,
        color: starColor,
        zIndex: 2,
        height: '100%',
        WebkitTextStroke: `1px ${starColor}`,
      }}>★</span>
      <span style={{
        visibility: fill === 0 ? 'hidden' : 'hidden',
      }}>★</span>
    </span>
  );
};

export default Star; 