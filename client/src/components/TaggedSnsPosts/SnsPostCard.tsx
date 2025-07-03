import React from "react";
import LikeCount from "./LikeCount";

type SnsPostCardProps = {
  image: string;
  tags: string[];
  desc: string;
  likes: number | null;
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
    borderRadius: 2,
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
    marginBottom: 6,
    minHeight: 36,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: 2,
    flex: 1,
  },
  tags: {
    color: '#131518',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: "18px",
    marginBottom: 4,
    minHeight: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
};

const SnsPostCard = ({ image, tags, desc, likes }: SnsPostCardProps) => (
  <div style={styles.card}>
    <div style={styles.imageWrap}>
      <img src={image} alt={desc.slice(0, 20)} style={styles.image} />
    </div>
    <div style={styles.content}>
      {tags && tags.length > 0 && (
        <div style={styles.tags}>{tags.join(' , ')}</div>
      )}
      <div style={styles.desc}>{desc}</div>
      <LikeCount count={likes ?? 0} />
    </div>
  </div>
);

export default SnsPostCard; 