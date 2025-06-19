// SnsPostCard molecule: SNS 게시물 카드 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";
import LikeCount from "./LikeCount";

type SnsPostCardProps = {
  image: string;
  tag: string;
  title: string;
  desc: string;
  likes: number;
};

const styles = {
  card: {
    width: 140,
    borderRadius: 16,
    flex: '0 0 auto',
  },
  imageWrap: {
    position: "relative" as const,
  },
  image: {
    borderRadius: 4,
    width: 140,
    height: 186,
    objectFit: "cover" as const,
    display: "block",
  },
  content: {
    padding: "8px 8px 0 0",
  },
  desc: {
    color: "#131518",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    marginBottom: 12,
    minHeight: 36,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: 2,
    flex: 1,
  },
};

const SnsPostCard = ({ image, tag, title, desc, likes }: SnsPostCardProps) => (
  <div style={styles.card}>

    <div style={styles.imageWrap}>
      <img src={image} alt={title} style={styles.image} />
    </div>

    <div style={styles.content}>
      <div style={styles.desc}>{desc}</div>
      <LikeCount count={likes} />
    </div>
  </div>
);

export default SnsPostCard; 