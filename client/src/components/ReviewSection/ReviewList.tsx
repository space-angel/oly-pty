import React from "react";
import ReviewItem from "./ReviewItem";
import { Review } from "../../types/reviewSection";

interface ReviewListProps {
  reviews?: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews = [] }) => {
  return (
    <div>
      {reviews.map((review, idx) => (
        <React.Fragment key={review.id}>
          <ReviewItem {...review} />
          {idx < reviews.length - 1 && (
            <div style={{
              borderBottom: "1px solid #F3F3F3",
              margin: "15px -15px",
              padding: "0 15px",
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ReviewList; 