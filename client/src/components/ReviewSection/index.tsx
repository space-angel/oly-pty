import React, { useEffect, useState, useRef, useCallback } from "react";
import { Product } from "../../types/product";
import { Review } from "../../types/reviewSection";
import ReviewList from "./ReviewList";
import RecommendKeywords from "./RecommendKeywords";
import { reviewSectionApi } from "../../services/reviewSectionApi";
import FilterModal from "./FilterModal";
import { hasKeyword } from "../../utils/keywordHighlight";
import { useInView } from 'react-intersection-observer';

declare global {
  interface Window {
    amplitude?: any;
  }
}

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
    loading: false
  });
  const [currentSort, setCurrentSort] = useState('createdAt');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [keywordCounts, setKeywordCounts] = useState<{
    all: number;
    usage: number;
    method: number;
    part: number;
    tip: number;
  } | undefined>(undefined);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    type: null as string | null,
    tone: null as string | null,
    issues: [] as string[],
    reviewType: null as string | null,
    rating: null as number | null,
  });
  const pageSize = 9999;

  const [hasMore, setHasMore] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const { ref, inView } = useInView();

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

  const fetchReviews = async ({ reset = false, page = 1, filterArg = filter, sortArg = currentSort, keywordArg = currentKeyword } = {}) => {
    try {
      if (reset) setReviewState(prev => ({ ...prev, loading: true }));
      setIsFetchingNextPage(true);
      const cleanFilter = {
        ...filterArg,
        type: filterArg.type ?? undefined,
        tone: filterArg.tone ?? undefined,
        reviewType: filterArg.reviewType ?? undefined,
        rating: filterArg.rating ?? undefined,
      };
      const result = await reviewSectionApi.getReviews({
        productId: product._id,
        page,
        limit: pageSize,
        sort: sortArg,
        keyword: keywordArg,
        ...cleanFilter
      });
      setReviewState(prev => ({
        ...prev,
        reviews: reset ? result.reviews : [...prev.reviews, ...result.reviews],
        total: result.total,
        totalPages: result.totalPages,
        page,
        loading: false
      }));
      setHasMore(result.page < result.totalPages);
      setIsFetchingNextPage(false);
    } catch (error) {
      setReviewState(prev => ({ ...prev, loading: false }));
      setIsFetchingNextPage(false);
    }
  };

  const fetchKeywordCounts = async () => {
    try {
      const counts = await reviewSectionApi.getKeywordCounts(product._id);
      setKeywordCounts(counts);
    } catch (error) {
    }
  };

  useEffect(() => {
    setReviewState(prev => ({ ...prev, reviews: [], page: 1, loading: true }));
    setHasMore(true);
    fetchReviews({ reset: true, page: 1, filterArg: filter, sortArg: currentSort, keywordArg: currentKeyword });
    // eslint-disable-next-line
  }, [product._id, currentSort, currentKeyword, filter]);

  useEffect(() => {
    if (inView && hasMore && !reviewState.loading && !isFetchingNextPage) {
      fetchReviews({ page: reviewState.page + 1, filterArg: filter, sortArg: currentSort, keywordArg: currentKeyword });
    }
    // eslint-disable-next-line
  }, [inView, hasMore, reviewState.loading, isFetchingNextPage, reviewState.page, filter, currentSort, currentKeyword]);

  useEffect(() => {
    fetchKeywordCounts();
  }, [product._id]);

  // 상품 상세 진입 트래킹
  useEffect(() => {
    if (window.amplitude && product?._id) {
      window.amplitude.track('goods_detail_view', {
        product_id: product._id,
        product_name: product.name
      });
    }
  }, [product?._id]);

  // 리뷰 무한 스크롤 트래킹
  useEffect(() => {
    if (inView && hasMore && window.amplitude) {
      window.amplitude.track('review_scroll_depth', {
        page: reviewState.page,
        product_id: product._id
      });
    }
  }, [inView]);

  const handleSortChange = (sortType: string) => {
    setCurrentSort(sortType);
    if (window.amplitude) {
      window.amplitude.track('review_sort_changed', {
        sort_type: sortType,
        product_id: product._id
      });
    }
    setReviewState(prev => ({ ...prev, page: 1, reviews: [] }));
    setHasMore(true);
  };

  const handleKeywordChange = (keyword: string) => {
    setCurrentKeyword(keyword);
    if (window.amplitude) {
      window.amplitude.track('review_keyword_click', {
        keyword_type: keyword,
        product_id: product._id
      });
    }
    setReviewState(prev => ({ ...prev, page: 1, reviews: [] }));
    setHasMore(true);
  };

  const handleFilterApply = (filter: any) => {
    setFilter(filter);
    setFilterModalOpen(false);
    if (window.amplitude) {
      window.amplitude.track('review_filter_applied', {
        ...filter,
        product_id: product._id
      });
    }
    setReviewState(prev => ({ ...prev, page: 1, reviews: [] }));
    setHasMore(true);
  };

  const handleFilterReset = () => {
    setFilter({ type: null, tone: null, issues: [], reviewType: null, rating: null });
    if (window.amplitude) {
      window.amplitude.track('review_filter_reset', {
        product_id: product._id
      });
    }
    setReviewState(prev => ({ ...prev, page: 1, reviews: [] }));
    setHasMore(true);
  };

  const filteredReviews = reviewState.reviews.filter(review => {
    const typeMatch = filter.type ? review.skinType === filter.type : true;
    const toneMatch = filter.tone ? review.skinTone === filter.tone : true;
    const issuesMatch = filter.issues.length > 0 ? filter.issues.every(issue => review.skinConcerns?.includes(issue)) : true;
    const ratingMatch = filter.rating ? review.rating === filter.rating : true;
    const photoMatch = filter.reviewType === '포토리뷰' ? (review.images && review.images.length > 0) :
                       filter.reviewType === '일반리뷰' ? (!review.images || review.images.length === 0) : true;
    return typeMatch && toneMatch && issuesMatch && ratingMatch && photoMatch;
  });

  // 필터링된 리뷰에서 키워드별 개수 실시간 계산 (본문에서 추출)
  const keywordCountsLive = {
    all: filteredReviews.length,
    usage: filteredReviews.filter(r => hasKeyword(r.content, 'usage')).length,
    method: filteredReviews.filter(r => hasKeyword(r.content, 'method')).length,
    part: filteredReviews.filter(r => hasKeyword(r.content, 'part')).length,
    tip: filteredReviews.filter(r => hasKeyword(r.content, 'tip')).length,
  };

  // 필터가 하나라도 적용되어 있는지 확인
  const isFilterActive = !!(filter.type || filter.tone || filter.issues.length > 0 || filter.reviewType || filter.rating);

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

          <button style={{
            ...styles.filterBtn,
            color: '#222',
            opacity: isFilterActive ? 1 : 0.5,
            fontWeight: isFilterActive ? 700 : 400
          }} onClick={() => setFilterModalOpen(true)}>
            <span style={{
              ...styles.filterIcon,
              color: '#222',
              opacity: isFilterActive ? 1 : 0.5
            }}>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.7892 2.82044C5.09468 1.72678 6.09842 0.9245 7.28959 0.9245C8.48075 0.9245 9.4845 1.72678 9.78999 2.82044H11.2999C11.6866 2.82044 12 3.13385 12 3.52044C12 3.90705 11.6866 4.22044 11.2999 4.22044H9.78993C9.48432 5.314 8.48064 6.11617 7.28959 6.11617C6.09854 6.11617 5.09485 5.314 4.78926 4.22044H0.799976C0.413377 4.22044 0.0999756 3.90705 0.0999756 3.52044C0.0999756 3.13385 0.413377 2.82044 0.799976 2.82044H4.7892ZM7.28953 4.71639C7.23965 4.71639 7.19048 4.71334 7.14218 4.7074L7.28953 4.71639ZM7.14218 4.7074C6.55126 4.63481 6.0937 4.13112 6.0937 3.52056C6.0937 3.2591 6.17758 3.01725 6.31991 2.82044C6.53715 2.51999 6.89047 2.3245 7.28959 2.3245C7.68865 2.3245 8.04209 2.51999 8.25932 2.82044C8.40166 3.01725 8.48536 3.2591 8.48536 3.52056C8.48536 3.78191 8.40148 4.02369 8.25926 4.22044C8.07446 4.47605 7.79108 4.65569 7.46488 4.70362C7.40765 4.71204 7.34909 4.71639 7.28953 4.71639" fill="#222" fillOpacity="0.75"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.69569 12.8245C3.88527 12.8245 4.88794 12.0243 5.19489 10.9328L11.3002 10.9286C11.6868 10.9284 11.9999 10.6148 11.9996 10.2282C11.9994 9.84155 11.6858 9.52835 11.2992 9.52865L5.19722 9.53285C4.89307 8.43705 3.88831 7.63281 2.69569 7.63281C1.26205 7.63281 0.0998535 8.79499 0.0998535 10.2286C0.0998535 11.6623 1.26205 12.8245 2.69569 12.8245ZM2.69569 9.03281C2.29375 9.03281 1.93812 9.23109 1.72132 9.53524C1.58178 9.73083 1.4998 9.97029 1.4998 10.2289C1.4998 10.8893 2.03519 11.4247 2.69563 11.4247C3.35607 11.4247 3.89146 10.8893 3.89146 10.2289C3.89146 9.9697 3.809 9.72972 3.66888 9.5339C3.45198 9.2305 3.09703 9.03281 2.69569 9.03281Z" fill="#222" fillOpacity="0.75"/>
            </svg>
            </span>
            맞춤 필터
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
          keywordCounts={isFilterActive ? keywordCountsLive : keywordCounts}
        />
      </div>

      {/* 리뷰 목록 */}
      <ReviewList 
        reviews={filteredReviews}
        loading={reviewState.loading}
        currentKeyword={currentKeyword}
        filter={filter}
      />
      {isFetchingNextPage ? <div style={{textAlign:'center',padding:'16px'}}>로딩 중...</div> : <div ref={ref} />}
      {!hasMore && <div style={{textAlign:'center',padding:'10px',color:'#aaa',fontSize:12}}>더 이상 리뷰가 없습니다.</div>}

      {/* 바텀 구매 컴포넌트 영역 확보용 회색 컨테이너 */}
      <div style={{ width: '100%', height: 160, background: '#fff' }} />

      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />
    </div>
  );
};

export default ReviewSection;