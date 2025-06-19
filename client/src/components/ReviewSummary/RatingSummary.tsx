// RatingSummary molecule: 전체 평점/별점/리뷰수 섹션 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";
import StarRating from "./StarRating";

interface RatingSummaryProps {
  totalReviewCount?: number;
  averageRating?: number;
}

const styles = {
  ratingBox: {
    display: 'flex' as const, flexDirection: 'column' as const, alignItems: 'center' as const,     width: '28.8%',
  },
  ratingCount: {
    color: '#8994A2', fontSize: 12, lineHeight: 1.2, marginBottom: 4
  },
  ratingRow: {
    display: 'flex' as const, flexDirection: 'row' as const, alignItems: 'flex-end' as const, gap: 0
  },
  ratingScore: {
    fontSize: 36, lineHeight: 1, color: '#222', fontWeight: 400,
  },
  ratingUnit: {
    fontSize: 16, color: '#222', marginBottom: 0 ,fontWeight: 700
  },
  ratingLabel: {
    fontWeight: 'bold', fontSize: 15, color: '#222', marginTop: 4
  },
  starRow: {
    display: 'flex' as const, flexDirection: 'row' as const, alignItems: 'center' as const, gap: 4, marginTop: 8
  },
  star: {
    display: 'inline-block' as const,
    width: 12,
    height: 12,
    color: '#FF5753',
    fontSize: 14,
    lineHeight: 1,
  }
};

const RatingSummary: React.FC<RatingSummaryProps> = ({ 
  totalReviewCount = 6891, 
  averageRating = 4.7 
}) => (
  <div style={styles.ratingBox}>
    <div style={styles.ratingCount}>총 {totalReviewCount.toLocaleString()}건</div>
    <div style={styles.ratingRow}>
      <span style={styles.ratingScore}>{averageRating}</span>
      <span style={styles.ratingUnit}>점</span>
    </div>
    <StarRating count={5} style={styles.starRow} starStyle={styles.star} value={averageRating} />
  </div>
);

export default RatingSummary; 