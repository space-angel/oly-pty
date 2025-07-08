import React, { useEffect, useRef, useState } from "react";
import { track as amplitudeTrack } from '@amplitude/analytics-browser';

console.log('[HeaderBar] mount');

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 32 32",
  xmlns: "http://www.w3.org/2000/svg",
};

// 헤더 높이 상수 (TopTab에서 marginTop으로 활용)
export const HEADER_HEIGHT = 56;

const HeaderBar: React.FC<{ onVisibleChange?: (visible: boolean) => void }> = ({ onVisibleChange }) => {
  const [slideDown, setSlideDown] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr < HEADER_HEIGHT) {
        if (!slideDown) {
          setSlideDown(true);
          onVisibleChange && onVisibleChange(true);
        }
      } else {
        if (curr < lastScroll.current) {
          if (!slideDown) {
            setSlideDown(true);
            onVisibleChange && onVisibleChange(true);
          }
        } else if (curr > lastScroll.current) {
          if (slideDown) {
            setSlideDown(false);
            onVisibleChange && onVisibleChange(false);
          }
        }
      }
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onVisibleChange, slideDown]);

  const baseStyle: React.CSSProperties = {
    width: "100%",
    height: HEADER_HEIGHT,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid #eee",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
  };

  return (
    <header
      style={{
        ...baseStyle,
        transform: slideDown ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <button aria-label="뒤로가기" style={iconButtonStyle} onClick={() => {
        amplitudeTrack('header_exit_click', {
          button_type: 'back',
          timestamp: Date.now(),
          user_id: null // TODO: 실제 유저 정보 연동 시 교체
        });
        alert('이 버튼은 리뷰탭 경험 데이터 확보를 위한 프로토타입 테스트용입니다.');
        // 기존 뒤로가기 동작이 있다면 여기에 추가
      }}>
        <svg {...iconProps}>
          <path fill="none" stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" d="M14.997 25.982 4.992 15.987l9.995-10.005"/>
          <path stroke="#131518" strokeLinecap="square" strokeWidth="1.7" vectorEffect="non-scaling-stroke" d="m28.018 15.975-22 .011"/>
        </svg>
      </button>
      <div style={{ display: "flex", gap: 20 }}>
        <button aria-label="검색" style={iconButtonStyle}>
          <svg {...iconProps}>
            <path fill="none" stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" d="M13.5095 23.0047C18.7562 23.0021 23.0074 18.7466 23.0048 13.4999C23.0022 8.25323 18.7468 4.00204 13.5001 4.00464C8.25334 4.00724 4.00216 8.26264 4.00476 13.5093C4.00736 18.756 8.26276 23.0073 13.5095 23.0047Z"/>
            <path stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" strokeLinecap="round" d="M28.4852 28.4854L20.7071 20.7072"/>
          </svg>
        </button>
        <button aria-label="홈" style={iconButtonStyle} onClick={() => {
          amplitudeTrack('header_exit_click', {
            button_type: 'home',
            timestamp: Date.now(),
            user_id: null // TODO: 실제 유저 정보 연동 시 교체
          });
          alert('이 버튼은 리뷰탭 경험 데이터 확보를 위한 프로토타입 테스트용입니다.');
          // 기존 홈 이동 동작이 있다면 여기에 추가
        }}>
          <svg {...iconProps}>
            <path fill="none" stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" d="M3.70944 28.861L3.70166 13.1703L16.0466 3.12988L28.4016 13.1581L28.4094 28.8487L19.7394 28.853L19.7364 22.9374C19.7355 21.0154 17.9767 19.4648 16.0547 19.4658C14.1328 19.4667 12.3724 21.0191 12.3733 22.941L12.3763 28.8567L3.70944 28.861Z"/>
          </svg>
        </button>
        <button aria-label="장바구니" style={iconButtonStyle}>
          <svg {...iconProps}>
            <path fill="none" stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" d="M25.8801 8.4314H6.09161L3.73584 28.691H28.2358L25.8801 8.4314Z"/>
            <path fill="none" stroke="#131518" strokeWidth="1.7" vectorEffect="non-scaling-stroke" strokeLinecap="round" d="M20.5333 11V7.26667C20.5333 4.91025 18.6231 3 16.2667 3V3C13.9103 3 12 4.91025 12 7.26667V11"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderBar; 