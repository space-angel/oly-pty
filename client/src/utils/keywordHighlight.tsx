import React from 'react';

// 키워드별 검색 패턴 매핑
const keywordPatterns = {
  'usage': /(사용감|제형|발림성|발리기|바르기|발라|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/gi,
  'method': /(사용방법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며|사용법|적용법|도포법)/gi,
  'part': /(사용부위|부위|얼굴|이마|볼|코|턱|관자놀이|T존|U존|윗입술|아랫입술|눈가|눈밑|눈위|눈옆|눈앞|눈뒤)/gi,
  'tip': /(사용팁|팁|꿀팁|노하우|조언|추천|추천법|사용법|적용법|도포법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/gi
};

/**
 * 텍스트에서 키워드를 하이라이트 처리하는 함수
 * @param text 원본 텍스트
 * @param keyword 선택된 키워드 ID
 * @returns 하이라이트된 JSX 요소
 */
export const highlightKeyword = (text: string, keyword: string): React.ReactNode => {
  if (!keyword || keyword === 'all' || !keywordPatterns[keyword as keyof typeof keywordPatterns]) {
    return text;
  }

  const pattern = keywordPatterns[keyword as keyof typeof keywordPatterns];
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (pattern.test(part)) {
      return (
        <span 
          key={index} 
          style={{
            backgroundColor: '#FFF3CD',
            color: '#856404',
            padding: '1px 2px',
            borderRadius: '2px',
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

/**
 * 텍스트에서 키워드가 포함되어 있는지 확인하는 함수
 * @param text 검사할 텍스트
 * @param keyword 검사할 키워드 ID
 * @returns 키워드 포함 여부
 */
export const hasKeyword = (text: string, keyword: string): boolean => {
  if (!keyword || keyword === 'all' || !keywordPatterns[keyword as keyof typeof keywordPatterns]) {
    return false;
  }

  const pattern = keywordPatterns[keyword as keyof typeof keywordPatterns];
  return pattern.test(text);
}; 