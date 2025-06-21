import React from "react";
import { Product } from "../types/product";
import ReviewSummary from "./ReviewSummary";
import TaggedSnsPosts from "./TaggedSnsPosts";
import ReviewSection from "./ReviewSection";

interface ReviewTabProps {
  product: Product;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ product }) => {
  return (
    <div>
      <ReviewSummary product={product} />
      <div style={{ height: "8px", background: "rgb(246, 247, 249)", }}></div>
      <TaggedSnsPosts />
      <div style={{ height: "8px", background: "rgb(246, 247, 249)",}}></div>
      <ReviewSection product={product} />
    </div>
  );
};

export default ReviewTab; 
