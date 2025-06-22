import React from "react";
import ReviewItem from "./ReviewItem";
import { Review } from "../../types/reviewSection";

interface ReviewListProps {
  reviews?: Review[];
  loading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentKeyword?: string;
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
  page,
  totalPages,
  onPageChange,
  currentKeyword
}) => {
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        로딩 중...
      </div>
    );
  }

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          style={styles.pageButton(i === page)}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      {reviews.map((review, idx) => (
        <React.Fragment key={review._id}>
          <ReviewItem {...review} currentKeyword={currentKeyword} />
          {idx < reviews.length - 1 && (
            <div style={{
              borderBottom: "1px solid #F3F3F3",
              margin: "15px -15px",
              padding: "0 15px",
            }} />
          )}
        </React.Fragment>
      ))}
      
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default ReviewList; 