import React, { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { Review } from "../../types/reviewSection";
import ReviewList from "./ReviewList";
import RecommendKeywords from "./RecommendKeywords";
import { reviewSectionApi } from "../../services/reviewSectionApi";

interface ReviewSectionProps {
  product: Product;
}

interface ReviewPhoto {
  id: number;
  url: string;
  alt?: string;
}

interface ReviewState {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
}

const styles = {
  container: {
    background: "#fff",
    borderRadius: 16,
    padding: "10px 15px 0 15px",
  },
  
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    paddingTop: 10,
    display: "flex",
    flex: 1,
    fontSize: 16,
    fontWeight: 700,
    color: "#222",
  },

  sortRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0 0 0",
    gap: 0,
  },

  sortTab: (active: boolean) => ({
    color: active ? "#292C33" : "#757D86",
    fontWeight: active ? 700 : 400,
    fontSize: 13,
    display: "flex",
    justifyContent: "center",
    padding: "0 8px 0 0px",
    background: "none",
    border: "none",
    cursor: "pointer",
  }),

  sortDivider: {
    width: 1,
    height: 16,
    margin: "0 8px 0 0px",
    background: "#EDEDF0",
  },

  infoIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "1px solid #bfc5cc",
    color: "#bfc5cc",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: 400,
    background: "#fff",
  },

  filterBtn: {
    color: "#222",
    fontWeight: 500,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: 24,
    background: "none",
    border: "none",
    padding: 0,
  },

  filterIcon: {
    marginRight: 4,
    display: "inline-block",
    verticalAlign: "middle",
  },
  
  photoRow: {
    display: "flex",
    gap: "8px",
    overflowX: "auto" as const,
    padding: "16px 0",
  },

  photo: {
    width: "100px",
    height: "100px",
    objectFit: "cover" as const,
    borderRadius: "4px",
  },

  keywordSection: {
    marginBottom: 24,
    padding: "15px 0px",
    margin: "15px -15px",
    background: "rgb(246, 247, 249)",
  },

  keywordTitle: {
    color: "#49505a",
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 15,
  },

  keywordRow: {
    marginTop: 16,
    padding: "0 15px",
    height: "32px",
  },

  keywordBtn: (active: boolean) => ({
    alignItems: "center",
    justifyContent: "center",
    width : "auto",
    height: "100%",
    background: active ? "#222" : "#fff",
    color: active ? "#fff" : "rgb(117, 125, 134)",
    border: "1px solid #bfc5cc",
    borderRadius: 20,
    padding: "0px 16px",
    fontSize: 13,
    fontWeight: 400,
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ product }) => {
  const [reviewState, setReviewState] = useState<ReviewState>({
    reviews: [],
    total: 0,
    page: 1,
    totalPages: 1,
    loading: true
  });
  const [currentSort, setCurrentSort] = useState('createdAt');
  const [currentKeyword, setCurrentKeyword] = useState('');

  const sortOptions = [
    { label: "최신순", value: "createdAt", active: true, info: false },
    { label: "도움순", value: "likes", active: false, info: false },
    { label: "평점순", value: "rating", active: false, info: true },
  ];

  const keywords = [
    { id: "all", label: "전체", active: true },
    { id: "usage", label: "#사용감" },
    { id: "method", label: "#사용방법" },
    { id: "part", label: "#사용부위" },
    { id: "tip", label: "#사용팁" },
  ];

  const fetchReviews = async () => {
    try {
      setReviewState(prev => ({ ...prev, loading: true }));
      const result = await reviewSectionApi.getReviews({
        productId: product._id,
        page: reviewState.page,
        sort: currentSort,
        keyword: currentKeyword
      });
      setReviewState(prev => ({
        ...prev,
        reviews: result.reviews,
        total: result.total,
        totalPages: result.totalPages,
        loading: false
      }));
    } catch (error) {
      console.error('리뷰 로딩 실패:', error);
      setReviewState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product._id, reviewState.page, currentSort, currentKeyword]);

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    setReviewState(prev => ({ ...prev, page: 1 }));
  };

  const handleKeywordChange = (keyword: string) => {
    setCurrentKeyword(keyword === 'all' ? '' : keyword);
    setReviewState(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>전체 리뷰 ({reviewState.total})</div>

      {/* 상단 정렬/필터 */}
      <div style={styles.header}>
        <div style={styles.sortRow}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {sortOptions.map((opt, idx) => (
              <React.Fragment key={opt.label}>
                <button 
                  style={styles.sortTab(opt.value === currentSort)}
                  onClick={() => handleSortChange(opt.value)}
                >
                  {opt.label}
                  {opt.info && (
                    <span style={styles.infoIcon}>i</span>
                  )}
                </button>
                {idx < sortOptions.length - 1 && <div style={styles.sortDivider} />}
              </React.Fragment>
            ))}
          </div>

          <button style={styles.filterBtn}>
            <span style={styles.filterIcon}>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.7892 2.82044C5.09468 1.72678 6.09842 0.9245 7.28959 0.9245C8.48075 0.9245 9.4845 1.72678 9.78999 2.82044H11.2999C11.6866 2.82044 12 3.13385 12 3.52044C12 3.90705 11.6866 4.22044 11.2999 4.22044H9.78993C9.48432 5.314 8.48064 6.11617 7.28959 6.11617C6.09854 6.11617 5.09485 5.314 4.78926 4.22044H0.799976C0.413377 4.22044 0.0999756 3.90705 0.0999756 3.52044C0.0999756 3.13385 0.413377 2.82044 0.799976 2.82044H4.7892ZM7.28953 4.71639C7.23965 4.71639 7.19048 4.71334 7.14218 4.7074L7.28953 4.71639ZM7.14218 4.7074C6.55126 4.63481 6.0937 4.13112 6.0937 3.52056C6.0937 3.2591 6.17758 3.01725 6.31991 2.82044C6.53715 2.51999 6.89047 2.3245 7.28959 2.3245C7.68865 2.3245 8.04209 2.51999 8.25932 2.82044C8.40166 3.01725 8.48536 3.2591 8.48536 3.52056C8.48536 3.78191 8.40148 4.02369 8.25926 4.22044C8.07446 4.47605 7.79108 4.65569 7.46488 4.70362C7.40765 4.71204 7.34909 4.71639 7.28953 4.71639" fill="#292C33" fill-opacity="0.75"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69569 12.8245C3.88527 12.8245 4.88794 12.0243 5.19489 10.9328L11.3002 10.9286C11.6868 10.9284 11.9999 10.6148 11.9996 10.2282C11.9994 9.84155 11.6858 9.52835 11.2992 9.52865L5.19722 9.53285C4.89307 8.43705 3.88831 7.63281 2.69569 7.63281C1.26205 7.63281 0.0998535 8.79499 0.0998535 10.2286C0.0998535 11.6623 1.26205 12.8245 2.69569 12.8245ZM2.69569 9.03281C2.29375 9.03281 1.93812 9.23109 1.72132 9.53524C1.58178 9.73083 1.4998 9.97029 1.4998 10.2289C1.4998 10.8893 2.03519 11.4247 2.69563 11.4247C3.35607 11.4247 3.89146 10.8893 3.89146 10.2289C3.89146 9.9697 3.809 9.72972 3.66888 9.5339C3.45198 9.2305 3.09703 9.03281 2.69569 9.03281Z" fill="#292C33" fill-opacity="0.75"/>
            </svg>
            </span>
            필터
          </button>
        </div>
      </div>

      {/* 키워드 필터 */}
      <div style={styles.keywordSection}>
        <div style={styles.keywordTitle}>리뷰 키워드</div>
        <RecommendKeywords 
          keywords={keywords}
          onKeywordChange={handleKeywordChange}
          currentKeyword={currentKeyword}
        />
      </div>

      {/* 리뷰 목록 */}
      <ReviewList 
        reviews={reviewState.reviews}
        loading={reviewState.loading}
        page={reviewState.page}
        totalPages={reviewState.totalPages}
        onPageChange={(page) => setReviewState(prev => ({ ...prev, page }))}
      />
    </div>
  );
};

export default ReviewSection;