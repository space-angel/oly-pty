import React from "react";
import ReviewItem from "./ReviewItem";
import { Review } from "../../types/reviewSection";

interface ReviewListProps {
  reviews?: Review[];
  loading?: boolean;
  lastReviewRef?: (node: any) => void;
  currentKeyword?: string;
  filter?: {
    type?: string | null;
    tone?: string | null;
    issues?: string[];
  };
}

const styles = {
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px',
    marginBottom: '16px',
  },
  pageButton: (isActive: boolean) => ({
    padding: '8px 12px',
    border: '1px solid #EDEDF0',
    borderRadius: '4px',
    background: isActive ? '#222' : '#fff',
    color: isActive ? '#fff' : '#222',
    cursor: 'pointer',
    fontSize: '14px',
  }),
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 0',
  }
};

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews = [], 
  loading = false,
  lastReviewRef,
  currentKeyword,
  filter
}) => {
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      {reviews.map((review, idx) => {
        const isLast = idx === reviews.length - 1;
        const key = (review._id || idx) + '-' + idx;
        return (
          <React.Fragment key={key}>
            <div ref={isLast && lastReviewRef ? lastReviewRef : undefined}>
              <ReviewItem {...review} currentKeyword={currentKeyword} filter={filter} />
            </div>
            {idx < reviews.length - 1 && (
              <div style={{
                borderBottom: "1px solid #F3F3F3",
                margin: "15px -15px",
                padding: "0 15px",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ReviewList; 