# 데이터 마이그레이션을 위한 데이터셋 형식 안내

안녕하세요, 데이터 팀.

아래 형식에 맞춰 상품 및 리뷰 데이터셋을 준비해 주시기를 요청드립니다. 데이터는 JSON 배열 형태로, 각 객체는 명시된 필드와 타입을 따라야 합니다.

---

## 1. 상품(Product) 데이터

상품 정보에 대한 데이터 형식입니다.
 
### 필드 설명

| 필드명 | 타입 | 필수 여부 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| `name` | String | O | 상품명 (최대 100자) | "캐릭터 반팔 티셔츠" |
| `brand` | String | O | 브랜드명 | "Awesome Brand" |
| `originalPrice` | Number | O | 정상가 (0 이상) | 29000 |
| `salePrice` | Number | O | 판매가 (0 이상) | 26100 |
| `discountRate` | Number | O | 할인율 (0 ~ 100) | 10 |
| `imageUrl` | String | O | 상품 대표 이미지 URL | "https://example.com/product_image.jpg" |
| `badges` | Array<String> | X | 상품 뱃지 | `["NEW", "BEST"]` |
| `rating` | Number | X | 평균 평점 (0 ~ 5, 기본값: 0) | 4.5 |
| `reviewCount` | Number | X | 리뷰 수 (기본값: 0) | 120 |
| `watchingCount` | Number | X | 보고 있는 사람 수 (기본값: 0) | 23 |
| `iconColors` | Array<String> | X | 아이콘 색상 (Hex 코드) | `["#FF0000", "#00FF00"]` |
| `reviewSummary` | Object | X | 리뷰 요약 정보 | (아래 `reviewSummary` 객체 구조 참고) |
| `reviewSection` | Object | X | 리뷰 섹션 정보 | (아래 `reviewSection` 객체 구조 참고) |

#### `reviewSummary` 객체 구조

| 필드명 | 타입 | 필수 여부 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| `totalReviewCount` | Number | X | 총 리뷰 수 (기본값: 0) | 150 |
| `averageRating` | Number | X | 평균 평점 (기본값: 0) | 4.7 |
| `scoreBars`| Array<Number> | X | 점수대별 리뷰 수 (1점~5점 순서, 기본값: `[0,0,0,0,0]`) | `[5, 10, 25, 80, 30]` |
| `satisfaction`| Array<Object> | X | 만족도 항목 | (아래 `satisfaction` 객체 구조 참고) |

##### `satisfaction` 객체 구조

| 필드명 | 타입 | 필수 여부 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| `label` | String | O | 만족도 항목명 | "사이즈" |
| `value` | String | O | 만족도 값 | "커요" |
| `percent` | Number | O | 만족도 퍼센트 | 75 |
| `details` | Array<Object> | X | 상세 만족도 | `[{ "label": "커요", "percent": 75, "highlight": true }]` |

#### `reviewSection` 객체 구조

| 필드명 | 타입 | 필수 여부 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| `reviewPhotos` | Array<Object> | X | 포토 리뷰 사진 목록 | `[{ "id": 1, "url": "...", "alt": "photo"}]` |

### JSON 예시

```json
[
  {
    "name": "캐릭터 반팔 티셔츠",
    "brand": "Awesome Brand",
    "originalPrice": 29000,
    "salePrice": 26100,
    "discountRate": 10,
    "imageUrl": "https://image.msscdn.net/images/goods_img/20230508/3282490/3282490_16835300959419_500.jpg",
    "badges": ["NEW", "BEST"],
    "rating": 4.8,
    "reviewCount": 125,
    "watchingCount": 42,
    "iconColors": ["#E9E9E9", "#606060", "#424242"],
    "reviewSummary": {
      "totalReviewCount": 125,
      "averageRating": 4.8,
      "scoreBars": [1, 2, 8, 34, 80],
      "satisfaction": [
        {
          "label": "사이즈",
          "value": "정사이즈예요",
          "percent": 85,
          "details": [
            { "label": "커요", "percent": 10, "highlight": false },
            { "label": "정사이즈예요", "percent": 85, "highlight": true },
            { "label": "작아요", "percent": 5, "highlight": false }
          ]
        },
        {
            "label": "밝기",
            "value": "화면과 같아요",
            "percent": 92,
            "details": [
                { "label": "어두워요", "percent": 3, "highlight": false },
                { "label": "화면과 같아요", "percent": 92, "highlight": true },
                { "label": "밝아요", "percent": 5, "highlight": false }
            ]
        }
      ]
    },
    "reviewSection": {
      "reviewPhotos": [
        { "id": 1, "url": "https://image.msscdn.net/images/photo_review/20230520/3282490_3_500.jpg", "alt": "포토리뷰사진1" },
        { "id": 2, "url": "https://image.msscdn.net/images/photo_review/20230522/3282490_1_500.jpg", "alt": "포토리뷰사진2" }
      ]
    }
  }
]
```

---

## 2. 리뷰(Review) 데이터

상품 리뷰에 대한 데이터 형식입니다. 각 리뷰는 특정 상품(`productId`)에 연결되어야 합니다.

### 필드 설명

| 필드명 | 타입 | 필수 여부 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| `productId` | ObjectId | O | 리뷰가 달린 상품의 고유 ID | "60c72b2f9b1d8c001f8e4cde" |
| `userId` | String | O | 리뷰 작성자의 ID | "user123" |
| `userName`| String | O | 리뷰 작성자의 이름 | "김민준" |
| `profileImage`| String | X | 작성자 프로필 이미지 URL | "https://example.com/profile.jpg" |
| `rating` | Number | O | 평점 (1 ~ 5) | 5 |
| `content` | String | O | 리뷰 내용 (최대 1000자) | "옷이 정말 예뻐요. 잘 입겠습니다." |
| `images` | Array<String> | X | 리뷰에 첨부된 이미지 URL 목록 | `["https://example.com/review1.jpg"]` |
| `likes` | Number | X | '도움이 돼요' 수 (기본값: 0) | 15 |
| `option` | String | X | 구매한 상품 옵션 | "블랙 / L" |

### JSON 예시

```json
[
  {
    "productId": "60c72b2f9b1d8c001f8e4cde",
    "userId": "user123",
    "userName": "김민준",
    "profileImage": "https://randomuser.me/api/portraits/men/1.jpg",
    "rating": 5,
    "content": "옷이 정말 예뻐요. 품질도 좋고 배송도 빨랐습니다. 추천합니다!",
    "images": [
      "https://image.msscdn.net/images/photo_review/20230520/3282490_3_500.jpg"
    ],
    "likes": 12,
    "option": "블랙 / L"
  },
  {
    "productId": "60c72b2f9b1d8c001f8e4cde",
    "userId": "user456",
    "userName": "이서아",
    "profileImage": "https://randomuser.me/api/portraits/women/1.jpg",
    "rating": 4,
    "content": "사이즈가 딱 맞고 편해서 좋아요.",
    "images": [],
    "likes": 5,
    "option": "화이트 / M"
  }
] 