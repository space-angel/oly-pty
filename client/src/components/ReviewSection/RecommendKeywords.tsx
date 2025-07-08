import React from "react";
import { Keyword } from "../../types/reviewSection";

interface RecommendKeywordsProps {
  keywords: Keyword[];
  onKeywordChange: (keyword: string) => void;
  currentKeyword: string;
  keywordCounts?: {
    all: number;
    usage: number;
    method: number;
    part: number;
    tip: number;
  };
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'nowrap' as const,
    overflowX: 'auto' as const,
    gap: 8,
    height: '32px',
    padding: '0 15px',
    scrollbarWidth: 'none' as const, // Firefox
    msOverflowStyle: 'none' as const, // IE, Edge
  },

  button: (active: boolean) => ({
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "100%",
    background: active ? "#222" : "#fff",
    color: active ? "#fff" : "rgb(117, 125, 134)",
    border: "1px solid #bfc5cc",
    borderRadius: 20,
    padding: "0px 16px",
    fontSize: 13,
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    display: "flex",
    gap: "4px",
  }),

  count: {
    fontSize: 11,
    opacity: 0.8,
  }
};

const RecommendKeywords = ({ keywords, onKeywordChange, currentKeyword, keywordCounts }: RecommendKeywordsProps) => (
  <div style={styles.container} className="recommend-keyword-row">
    {keywords.map((keyword: Keyword) => {
      // const count = keywordCounts?.[keyword.id as keyof typeof keywordCounts] || 0;
      return (
        <button
          key={keyword.id}
          style={styles.button(currentKeyword === '' ? keyword.id === 'all' : keyword.id === currentKeyword)}
          onClick={() => onKeywordChange(keyword.id)}
        >
          <span>{keyword.label}</span>
          {/* {keywordCounts && (
            <span style={styles.count}>({count})</span>
          )} */}
        </button>
      );
    })}
  </div>
);

export default RecommendKeywords; 