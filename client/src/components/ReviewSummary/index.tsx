// ReviewSummary organism: 리뷰 요약 카드 컴포넌트
// 아토믹 디자인 - Organisms
// ---------------------------------------------
//
import React, { useState } from "react";
import ScoreGraph from "./ScoreGraph";
import SatisfactionRow from "./SatisfactionRow";
import RatingSummary from "./RatingSummary";
import { Product } from "../../types/product";
import { SatisfactionDetail } from "../../types/reviewSummary";
import { track as amplitudeTrack } from '@amplitude/analytics-browser';

interface ReviewSummaryProps {
  product: Product;
}

const styles = {
  container: {
    width: '100%',
    minWidth: 0,
    padding: '20px 12px',
    boxSizing: 'border-box' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
    background: '#fff',
  },

  optionBox: {
    width: '100%',
    boxSizing: 'border-box' as const,
    flexShrink: 0,
    display: 'flex' as const,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    border: '1px solid #bfc5cc',
    borderRadius: 12,
    marginBottom: 8,
    padding: '14px 16px',
  },

  optionText: {
    fontFamily: 'Pretendard JP, sans-serif',
    fontWeight: 500,
    fontSize: 16,
    color: '#8B95A1',
    letterSpacing: '-0.01em',
  },

  optionIcon: {
    width: 14,
    height: 14,
    display: 'inline-block' as const,
  },

  topRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    width: '100%',
    gap: 16,
    marginBottom: 8,
    
  },


  graphBox: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flex: 2,
    minWidth: 0,
    maxWidth: 180,
    width: '100%',
    gap: 4,
  },
  graphRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'flex-end' as const,
    justifyContent: 'flex-end' as const,
    gap: 8,
    marginBottom: -4,
  },
  graphCol: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
  },
  graphPercent: {
    fontSize: 10,
    color: '#8994A2',
    marginBottom: 4,
  },
  graphBarWrap: {
    position: 'relative' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-end' as const,
    height: 48,
    width: 8,
  },
  graphBarBg: {
    position: 'absolute' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 4,
    background: '#E5E7EA',
    borderRadius: 4,
    height: 48,
  },
  graphBar: {
    position: 'absolute' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 4,
    background: '#FF5753',
    borderRadius: 4,
    maxHeight: 48,
  },
  graphLabel: {
    fontSize: 10,
    color: '#8994A2',
    marginTop: 4,
  },
  satisfactionGrid: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr',
    gap: 8,
    width: '100%',
    marginTop: 8,
  },
  satisfactionRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    width: '100%',
  },
  satisfactionLabel: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    border: '1px solid #bfc5cc',
    borderRadius: 20,
    width: 73,
    height: 28,
    color: '#49505a',
    fontWeight: 600,
    fontSize: 13,
    marginRight: 12,
  },
  satisfactionValue: {
    flex: 'none',
    color: '#49505a',
    fontSize: 14,
    fontWeight: 500,
    marginRight: 'auto',
    textAlign: 'left' as const,
  },
  satisfactionDash: {
    flex: 1,
    borderTop: '1px dashed #DADDE0',
    margin: '0 8px',
  },
  satisfactionPercent: {
    width: 50,
    color: '#6b7280',
    fontSize: 13,
    textAlign: 'right' as const,
    marginRight: '0.25rem',
    fontWeight: 600,
  },
};

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ product }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleToggle = () => {
    setShowDetail(v => !v);
    amplitudeTrack('review_summary_toggle', {
      expanded: !showDetail,
      product_id: product._id
    });
  };

  if (!product.reviewSummary) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        background: '#fff',
        fontSize: '16px',
        color: '#ff3d3d',
      }}>
        리뷰 요약 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const ImgFace: React.FC = () => (
    <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26.5" r="25" fill="#FFE56B" stroke="#333333" strokeWidth="2"/>
      <path d="M26 41.5C32.0751 41.5 37 36.5751 37 30.5H15C15 36.5751 19.9249 41.5 26 41.5Z" fill="white" stroke="#333333" strokeWidth="1.5"/>
      <path d="M18 17.5L18 23.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 20.5H15" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 17.5L34 23.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M37 20.5H31" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const { totalReviewCount, averageRating, scoreBars, satisfaction } = product.reviewSummary;

  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <div style={{flex:1, alignItems:'center', display:'flex', flexDirection:'column', gap:5, marginTop:10,maxWidth:120}}>
          <ImgFace />
          <p style={{fontSize:14, color:'#222', fontWeight:700,margin:0,lineHeight:'18px'}}>최고</p>
        </div>
        <div style={{flex:1}}>
          <RatingSummary 
            averageRating={product.reviewSummary.averageRating}
            totalReviewCount={product.reviewSummary.totalReviewCount}
          />
        </div>
        <div style={{flex:1}}>
          <ScoreGraph bars={product.reviewSummary.scoreBars} styles={styles} />
        </div>
      </div>
      
      <div style={styles.satisfactionGrid}>
        {satisfaction.map((item) => {
          const details = item.details || [];
          
          // 접었을 때는 가장 높은 퍼센트를 가진 항목만 표시
          const getMaxDetail = (detailArray: SatisfactionDetail[]): SatisfactionDetail[] => {
            if (detailArray.length === 0) return [];
            
            // 가장 높은 퍼센트를 가진 항목 찾기
            const maxItem = detailArray.reduce((max, current) => 
              current.percent > max.percent ? current : max
            );
            
            return [maxItem];
          };
          
          const displayDetails = showDetail ? details : getMaxDetail(details);
          
          return (
            <SatisfactionRow
              key={item.label}
              label={item.label}
              value={item.value}
              percent={item.percent}
              styles={styles}
              detail={displayDetails}
            />
          );
        })}
        <button
          style={{
            margin: '8px auto 0',
            display: 'flex',
            background: 'none',
            border: 'none',
            color: '#49505a',
            fontSize: 13,
            cursor: 'pointer',
            alignItems: 'center',
            gap: 4,
          }}
          onClick={handleToggle}
        >
          {showDetail ? '접기' : '자세히'}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transition:'transform 0.2s', transform: showDetail ? 'rotate(180deg)' : 'none'}}>
            <path d="M4 6l4 4 4-4" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    amplitude?: any;
  }
}

export default ReviewSummary; 