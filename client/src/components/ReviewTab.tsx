import React from "react";
import ReviewSummary from "./ReviewSummary";
import TaggedSnsPosts from "./TaggedSnsPosts";
import ReviewSection from "./ReviewSection";

interface ReviewTabProps {
  productId?: number;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ productId = 1 }) => {
  return (
    <div>
      <ReviewSummary productId={productId} />
      <div style={{ height: "8px", background: "rgb(246, 247, 249)", }}></div>
      <TaggedSnsPosts />
      <div style={{ height: "8px", background: "rgb(246, 247, 249)",}}></div>
      <ReviewSection />
    </div>
  );
};

export default ReviewTab; 
