// TaggedSnsPosts organism: SNS 게시물 리스트 섹션 컴포넌트
// 아토믹 디자인 - Organisms
// ---------------------------------------------
//
import React from "react";
import SnsPostCard from "./SnsPostCard";

const dummyPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "상품 10",
    title: "여름쿨톤, 각질",
    desc: "팬톤 올해의 컬러로 선정된 '모카무스' 2025년에는",
    likes: 171,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "상품 10",
    title: "여름쿨톤, 각질",
    desc: "팬톤 올해의 컬러로 선정된 '모카무스' 2025년에는",
    likes: 171,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "상품 10",
    title: "여름쿨톤, 각질",
    desc: "팬톤 올해의 컬러로 선정된 '모카무스' 2025년에는",
    likes: 171,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "상품 10",
    title: "여름쿨톤, 각질",
    desc: "팬톤 올해의 컬러로 선정된 '모카무스' 2025년에는",
    likes: 171,
  },
];

const styles = {
  container: {
  },

  postHeader: {
    alignItems: "center",
    padding: "0px 15px",
    justifyContent: "space-between",

  },

  title: {
    display: "flex",
    flex: 1,
    fontSize: 16,
    fontWeight: 700,
    color: "#222",
  },

  list: {
    display: "flex",
    gap: 10,
    padding: "0px 15px 24px 15px",
    overflowX: 'auto' as const,
    flexWrap: 'nowrap' as const,
  },

};

const TaggedSnsPosts = () => (
  <div style={styles.container}>

    <div style={styles.postHeader}>
      <h2 style={styles.title}>이 상품을 태그한 셔터 게시물</h2>
    </div>

    <div style={styles.list} className="sns-list">
      {dummyPosts.map((post) => (
        <SnsPostCard key={post.id} {...post} />
      ))}
    </div>

  </div>
);

export default TaggedSnsPosts; 