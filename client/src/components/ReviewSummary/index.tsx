// ReviewSummary organism: 리뷰 요약 카드 컴포넌트
// 아토믹 디자인 - Organisms
// ---------------------------------------------
//
import React, { useState, useEffect } from "react";
import { getReviewSummary } from "../../services/reviewSummaryApi";
import { ReviewSummaryData, SatisfactionDetail } from "../../types/reviewSummary";
import StarRating from "./StarRating";
import ScoreGraph from "./ScoreGraph";
import SatisfactionRow from "./SatisfactionRow";
import RatingSummary from "./RatingSummary";

interface ReviewSummaryProps {
  productId?: number;
}

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  background: '#fff',
  fontSize: '16px',
  color: '#666',
};

const errorStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  background: '#fff',
  fontSize: '16px',
  color: '#ff3d3d',
};

const styles = {
  container: {
    width: '100%',
    minWidth: 0,
    padding: '20px 12px',
    boxSizing: 'border-box' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
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
    gap: 8,
    marginBottom: 8,
  },

  emojiBox: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    flex: 1,
    minWidth: 0,
    maxWidth: '33%',
    marginTop: '0.5rem',
  },
  emojiCircle: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: '#FFE56B',
    border: '2px solid #333',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: 32,
    marginBottom: 4,
  },
  ratingBox: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flex: 2,
    minWidth: '33%',
  },
  ratingCount: {
    color: '#8994A2',
    fontSize: 13,
    lineHeight: 1.2,
    marginBottom: 4,
  },
  ratingRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'flex-end' as const,
    gap: 4,
  },
  ratingScore: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 1,
    color: '#222',
  },
  ratingUnit: {
    fontSize: 22,
    color: '#6b7280',
    marginBottom: 4,
  },
  ratingLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginTop: 4,
  },
  starRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
    marginTop: 4,
  },
  star: {
    display: 'inline-block' as const,
    width: 20,
    height: 20,
    color: '#FF5753',
    fontSize: 22,
    lineHeight: 1,
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
    fontSize: 12,
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

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productId = 1 }) => {
  const [reviewSummary, setReviewSummary] = useState<ReviewSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchReviewSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getReviewSummary(productId);
        setReviewSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '리뷰 요약 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewSummary();
  }, [productId]);

  if (loading) {
    return <div style={loadingStyle}>리뷰 요약 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div style={errorStyle}>오류: {error}</div>;
  }

  if (!reviewSummary) {
    return <div style={errorStyle}>리뷰 요약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={styles.container}>
      {/* 옵션 드롭다운 */}
      <div style={styles.optionBox}>
        <span style={styles.optionText}>전체 상품 옵션</span>

        <span style={styles.optionIcon}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.4828 4.04311C12.2029 3.77648 11.7598 3.78727 11.4931 4.06722L6.99973 8.78499L2.50696 4.06725C2.24035 3.78729 1.79727 3.77647 1.51731 4.04308C1.23735 4.30969 1.22652 4.75277 1.49314 5.03274L6.49281 10.2828C6.62494 10.4215 6.8081 10.5 6.99967 10.5C7.19124 10.5 7.37446 10.4215 7.50659 10.2828L12.5069 5.03277C12.7736 4.75282 12.7628 4.30974 12.4828 4.04311Z" fill="#4E5968" fillOpacity="0.75"/>
          </svg>
        </span>

      </div>
      {/* 상단 통계/그래프 */}
      <div style={styles.topRow}>
        {/* 이모지 */}
        <div style={styles.emojiBox}>
            <span role="img" aria-label="최고">
              <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26.5" r="25" fill="#FFE56B" stroke="#333333" strokeWidth="2"/>
              <path d="M26 41.5C32.0751 41.5 37 36.5751 37 30.5H15C15 36.5751 19.9249 41.5 26 41.5Z" fill="white" stroke="#333333" strokeWidth="1.5"/>
              <path d="M18 17.5L18 23.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M21 20.5H15" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M34 17.5L34 23.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M37 20.5H31" stroke="#333333" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div style={{fontSize:14, fontWeight:600, textAlign: 'center'}}>최고</div>
            </span>

        </div>
        {/* 평점/별점 */}
        <RatingSummary 
          totalReviewCount={reviewSummary.totalReviewCount}
          averageRating={reviewSummary.averageRating}
        />
        {/* 그래프 */}
        <ScoreGraph bars={reviewSummary.scoreBars} styles={styles} />
      </div>
      {/* 항목별 만족도 */}
      <div style={styles.satisfactionGrid}>
        {reviewSummary.satisfaction.map((item, idx) => {
          const details = reviewSummary.satisfactionDetails[idx] || [];
          
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
          onClick={() => setShowDetail(v => !v)}
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

export default ReviewSummary; 