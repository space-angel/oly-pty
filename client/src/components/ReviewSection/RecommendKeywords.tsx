import React from "react";
import { Keyword } from "../../types/reviewSection";

interface RecommendKeywordsProps {
  keywords: Keyword[];
  styles: any;
}

const scrollbarHideStyle = {
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE, Edge
} as React.CSSProperties;

const RecommendKeywords = ({ keywords, styles }: RecommendKeywordsProps) => (
  <div style={styles.keywordSection}>
    <div style={styles.keywordTitle}>추천 키워드</div>
    <div
      style={{
        ...styles.keywordRow,
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        ...scrollbarHideStyle,
        gap: 8,
      }}
      className="recommend-keyword-row"
    >
      {keywords.map((keyword: Keyword) => (
        <button
          key={keyword.id}
          style={styles.keywordBtn(!!keyword.active)}
        >
          {keyword.label}
        </button>
      ))}
    </div>
  </div>
);

export default RecommendKeywords; 