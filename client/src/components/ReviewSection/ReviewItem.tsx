// ReviewItem molecule: 리뷰 카드 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";
import { Review } from "../../types/reviewSection";
import { highlightKeyword } from "../../utils/keywordHighlight";

export interface ReviewItemProps extends Review {
  currentKeyword?: string;
}

const defaultProfile = "https://randomuser.me/api/portraits/women/44.jpg";
const defaultBadgeColor = "rgb(240, 241, 244)";
const defaultInfoText =
  "해당 리뷰는 원칙적으로 기본 상품이 동일한 단종 사용 후 작성된 것이며, 개별성분에 따라 용량 내지 일부 부속(1+1, 기획상품 등)이 상이할 수 있음을 안내드립니다.";

const ReviewItem: React.FC<ReviewItemProps> = ({
  userName,
  profileImage = defaultProfile,
  createdAt,
  rating,
  option,
  content,
  likes = 0,
  images,
  currentKeyword,
}) => {
  return (
    <div style={styles.card}>
      <ReviewHeader user={userName} profileImage={profileImage} />
      <ReviewStarsAndDate rating={rating} date={new Date(createdAt).toLocaleDateString()} />
      <ReviewMeta option={option} />
      <ReviewContent content={content} currentKeyword={currentKeyword} />
      {images && images.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 0' }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`리뷰 이미지 ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: 4,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
      <ReviewActions
        likeCount={likes}
        style={{
          marginTop: images && images.length > 0 ? 20 : 8
        }}
      />
    </div>
  );
};

const ReviewHeader: React.FC<{
  user: string;
  profileImage: string;
}> = ({ user, profileImage }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom:22 }}>
    <img src={profileImage} alt="프로필" style={styles.profileImg} />
    <div style={{ marginLeft: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontWeight: 600, fontSize: 16 }}>{user}</span>
    </div>
  </div>
);

const ReviewStarsAndDate: React.FC<{ rating: number; date: string }> = ({ rating, date }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4, marginLeft: 0 }}>
    <span style={{ color: '#FF5753', fontSize: 13, letterSpacing: 0 }}>{'★'.repeat(Math.round(rating)).padEnd(5, '☆')}</span>
    <span style={{ fontSize: 13, color: '#B1B8C0', marginLeft: 8 }}>{date}</span>
  </div>
);

const ReviewMeta: React.FC<{
  option?: string;
}> = ({ option }) => (
  option ? <div style={styles.option}>[옵션] {option}</div> : null
);

const ReviewContent: React.FC<{ content: string; currentKeyword?: string }> = ({ content, currentKeyword }) => (
  <div style={styles.content}>
    {currentKeyword ? highlightKeyword(content, currentKeyword) : content}
  </div>
);

const ReviewInfo: React.FC<{ infoText?: string }> = ({ infoText }) => (
  infoText ? (
    <div style={styles.info}>{infoText}</div>
  ) : null
);

const ReviewActions: React.FC<{
  likeCount: number;
  style?: React.CSSProperties;
}> = ({ likeCount = 0, style }) => (
  <div style={{ ...styles.actions, ...style }}>
    <div style={{ display: 'flex', alignItems: 'end', gap: 4, marginBottom: 2 }}>
      <button style={{ ...styles.actionBtn, paddingBottom: 0 }}>도움이 돼요</button>
      <svg style={{ display: 'inline-block', marginBottom:2 ,marginLeft:2 , verticalAlign: 'bottom' }} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.88157 0.541138C5.39834 0.541138 5.00656 0.932887 5.00656 1.41614V2.73328C5.00656 3.88505 4.07012 4.84963 2.95011 4.85537H1.74898C1.19462 4.85537 0.597001 5.15498 0.384965 5.78764C0.200964 6.33667 0 7.23413 0 8.53158C0 9.82897 0.200964 10.7264 0.384965 11.2755C0.597001 11.9081 1.19462 12.2077 1.74898 12.2077H3.21949C3.22487 12.2079 3.23027 12.208 3.23568 12.208C3.24109 12.208 3.24649 12.2079 3.25187 12.2077H8.60586C10.3498 12.2077 11.8278 10.9238 12.0715 9.19693L12.5232 5.9963C12.6719 4.94296 11.8542 4.00172 10.7904 4.00172H8.92972V2.83835C8.92972 1.57088 7.90096 0.541138 6.63343 0.541138H5.88157ZM3.81901 11.0411H8.60586C9.7685 11.0411 10.7538 10.1851 10.9163 9.03383L11.3681 5.83325C11.4176 5.48215 11.1451 5.16838 10.7904 5.16838H8.34639C8.02422 5.16838 7.76306 4.90721 7.76306 4.58505V2.83835C7.76306 2.21463 7.25608 1.7078 6.63343 1.7078H6.17324V2.73328C6.17324 4.20144 5.185 5.499 3.81901 5.89701V11.0411ZM2.65235 6.02202H1.74898C1.66807 6.02202 1.60436 6.04355 1.56302 6.06974C1.52512 6.09377 1.50319 6.12247 1.49116 6.1584C1.34828 6.5847 1.16667 7.35675 1.16667 8.53158C1.16667 9.70635 1.34828 10.4784 1.49116 10.9047C1.50319 10.9406 1.52512 10.9693 1.56302 10.9934C1.60436 11.0196 1.66807 11.0411 1.74898 11.0411H2.65235V6.02202Z" fill="#99A1A8"/>
      </svg>
      <span style={{ fontSize: 13, color: '#B1B8C0', display: 'inline-block', verticalAlign: 'bottom', paddingBottom: 1 }}>{likeCount}</span>
    </div>

    <button style={{ ...styles.actionBtn, marginBottom: 2 }}>신고하기</button>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    marginBottom: 16,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: 15,
    color: '#222',
    position: 'relative',
    padding: '15px 0px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileImg: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    marginRight: 12,
    objectFit: 'cover',
    border: '1px solid #eee',
  },
  date: {
    fontSize: 13,
    color: '#B1B8C0',
    marginTop: 2,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    margin: '8px 0 4px 0',
  },
  stars: {
    color: '#FF5753',
    fontSize: 16,
  },
  option: {
    fontSize: 14,
    fontWeight: 400,
    color: 'rgb(153, 161, 168)',
    marginBottom: 6,
  },
  content: {
    display: 'inline-block',
    width: '100%',
    fontSize: 14,
    fontWeight: 400,
    color: '#222',
    lineHeight: '21px',
    marginTop: 6,
    marginBottom: 8,
    whiteSpace: 'pre-wrap',
  },
  info: {
    fontSize: 12,
    color: '#B1B8C0',
    background: '#F6F7F9',
    borderRadius: 6,
    padding: '8px 12px',
    margin: '8px 0',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    color: 'rgb(117, 125, 134)',
    fontSize: 13,
    cursor: 'pointer',
    padding: 0,
  },
};

export default ReviewItem; 