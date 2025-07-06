// ReviewItem molecule: 리뷰 카드 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";
import { Review } from "../../types/reviewSection";
import { highlightKeyword } from "../../utils/keywordHighlight";
import { track as amplitudeTrack } from '@amplitude/analytics-browser';

declare global {
  interface Window {
    amplitude?: any;
  }
}

export interface ReviewItemProps extends Omit<Review, 'productId'> {
  currentKeyword?: string;
  skinType?: string;
  skinTone?: string;
  skinConcerns?: string[];
  filter?: {
    type?: string | null;
    tone?: string | null;
    issues?: string[];
  };
  reviewId?: string;
  productId?: string;
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
  skinType,
  skinTone,
  skinConcerns,
  filter,
  reviewId,
  productId,
}) => {
  return (
    <div style={styles.card}>
      <ReviewHeader 
        user={userName} 
        profileImage={profileImage} 
        skinType={skinType || ''}
        skinTone={skinTone || ''}
        skinConcerns={skinConcerns || []}
        filter={filter}
      />
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
        reviewId={reviewId}
        productId={productId}
      />
    </div>
  );
};

const ReviewHeader: React.FC<{
  user: string;
  profileImage: string;
  skinType?: string;
  skinTone?: string;
  skinConcerns?: string[];
  filter?: {
    type?: string | null;
    tone?: string | null;
    issues?: string[];
  };
}> = ({ user, profileImage, skinType, skinTone, skinConcerns, filter }) => {
  // 값이 있으면만 표시, 없으면 아무것도 표시하지 않음
  const infoArr = [skinType, skinTone, ...(skinConcerns || [])].filter(Boolean) as string[];

  // 하이라이트 함수
  const highlight = (text: string) => (
    <span style={{
      background: '#FFF3CD',
      color: '#856404',
      borderRadius: 2,
      padding: '0 4px',
      margin: '0 2px'
    }}>{text}</span>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom:22 }}>
      <img src={profileImage} alt="프로필" style={styles.profileImg} />
      <div style={{ marginLeft: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
        <span style={{ fontWeight: 600, fontSize: 16 }}>{user}</span>
        {infoArr.length > 0 && (
          <span style={{ fontSize: 12, color: '#99a1a8', fontWeight: 400 }}>
            {infoArr.map((item, idx) => {
              const key = item + '-' + idx;
              // 필터와 일치하면 하이라이트
              if (
                (filter?.type && item === filter.type) ||
                (filter?.tone && item === filter.tone) ||
                (filter?.issues && filter.issues.includes(item))
              ) {
                return <React.Fragment key={key}>{highlight(item)}{idx < infoArr.length - 1 && ' · '}</React.Fragment>;
              }
              return <React.Fragment key={key}>{item}{idx < infoArr.length - 1 && ' · '}</React.Fragment>;
            })}
          </span>
        )}
      </div>
    </div>
  );
};

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
  reviewId?: string;
  productId?: string;
}> = ({ likeCount, style, reviewId, productId }) => {
  const handleHelpfulClick = () => {
    amplitudeTrack('review_helpful_click', {
      review_id: reviewId,
      product_id: productId
    });
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>
      <button style={styles.actionBtn} onClick={handleHelpfulClick}>도움 돼요</button>
      <span style={{ fontSize: 13, color: '#B1B8C0', display: 'inline-block', verticalAlign: 'bottom', paddingBottom: 1 }}>{likeCount}</span>
      <button style={{ ...styles.actionBtn, marginBottom: 2 }}>신고하기</button>
    </div>
  );
};

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