import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filter: any) => void;
  onReset?: () => void;
}

interface ChipProps {
  selected?: boolean;
}

// 일반 필터 타이틀
const FilterGroupTitle = styled.div`
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #4E5968;
  margin-bottom: 9px;
`;

// 피부 컨디션 타이틀
const ConditionGroupTitle = styled.div`
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #50585f;
  margin-bottom: 4px;
`;

// 일반 필터 칩
const Chip = styled.button<ChipProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 2px;
  min-width: 40px;
  height: 40px;
  border-radius: 4px;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 15px;
  font-weight: ${(props: ChipProps) => (props.selected ? 500 : 500)};
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #EEEFF1;
  color: #4E5968;
  background: #fff;
  transition: all 0.15s;
  white-space: nowrap;
  ${(props: ChipProps) =>
    props.selected &&
    css`
      background: #82DC28;
      color: #fff;
    `}
`;

const FilterGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
`;

const ChipRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 93%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  max-height: 78.57%;
  overflow: hidden;
  z-index: 2001;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  padding: 20px 0 15px 0;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  
`;

const ModalTitle = styled.h2`
  font-family: 'Pretendard JP', sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: #191F28;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 24px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #E5E7EA;
  margin: 0 0 0px 0;
  flex-shrink: 0;
`;

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 100%;
`;

const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 24px 0px 32px 0px;
  box-sizing: border-box;
`;

const ResetButton = styled.button`
  flex: 1 1 0;
  height: 50px;
  border-radius: 4px;
  background: #fff;
  border: none  ;
  color: #131518;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const ApplyButton = styled.button`
  flex: 2 1 0;
  height: 50px;
  border-radius: 4px;
  background: #131518;
  color: #fff;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  border: none;
`;

// 피부 컨디션 칩
const RoundChip = styled.button<{ selected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  height: 29px;
  border-radius: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #E5E7EA;
  color: #50585f;
  background: #fff;
  transition: all 0.15s;
  white-space: nowrap;
  margin-bottom: 2px;
  margin-right: 4px;
  ${(props) =>
    props.selected &&
    css`
      background: #82DC28;
      color: #fff;
    `}
`;

const AccordionHeader = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #292C33;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
`;

const AccordionLabelWrap = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  white-space: nowrap;
`;

const AccordionIcon = styled.span<{ open: boolean }>`
  display: inline-block;
  margin-left: 8px;
  width: 23px;
  height: 14px;
  transition: transform 0.2s;
  transform: rotate(${props => (props.open ? '180deg' : '0deg')});
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  margin-left: 0;
  appearance: none;
  border: 1px solid #BFC4CB;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;
  vertical-align: middle;

  &:checked {
    border: 1px solid #82DC28;
    background: #fff;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid #82DC28;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0.8);
    display: block;
  }
`;

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply, onReset }) => {
  // 선택 상태 관리 예시 (기존 필터만)
  const [skinType, setSkinType] = useState('전체');
  const [skinTone, setSkinTone] = useState('전체');
  // 아코디언 상태 (닫힘이 기본)
  const [showCondition, setShowCondition] = useState(false);
  const [conditionChecked, setConditionChecked] = useState(false);
  // 피부 컨디션: 타입/톤 단일 선택, 고민 다중 선택
  const [selectedConditionType, setSelectedConditionType] = useState<string | null>(null);
  const [selectedConditionTone, setSelectedConditionTone] = useState<string | null>(null);
  const [selectedConditionIssues, setSelectedConditionIssues] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    }
    return () => {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    };
  }, [open]);

  if (!open) return null;
  return (
    <ModalBackdrop>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>리뷰 검색 필터</ModalTitle>
          <CloseButton onClick={onClose} aria-label="닫기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.35055 21.0505C3.82055 21.5205 4.58055 21.5205 5.05055 21.0505L12.2005 13.9005L19.3505 21.0505C19.8205 21.5205 20.5805 21.5205 21.0505 21.0505C21.5205 20.5805 21.5205 19.8205 21.0505 19.3505L13.9005 12.2005L21.0505 5.05055C21.5205 4.58055 21.5205 3.82055 21.0505 3.35055C20.5805 2.88055 19.8205 2.88055 19.3505 3.35055L12.2005 10.5005L5.05055 3.35055C4.58055 2.88055 3.82055 2.88055 3.35055 3.35055C2.88055 3.82055 2.88055 4.58055 3.35055 5.05055L10.5005 12.2005L3.35055 19.3505C2.88055 19.8205 2.88055 20.5805 3.35055 21.0505Z" fill="black"/>
            </svg>
          </CloseButton>
        </ModalHeader>
        <Divider style={{ width: '100%' }} />
        <ModalBody style={{ padding: '10px px' }}>
          <FilterGroupWrap>
            <FilterGroupTitle style={{ paddingTop: '15px' }}>유형</FilterGroupTitle>
            <ChipRow>
              {['전체', '포토리뷰', '일반리뷰'].map(type => (
                <Chip
                  key={type}
                  selected={skinType === type}
                  onClick={() => setSkinType(type)}
                >
                  {type}
                </Chip>
              ))}
            </ChipRow>
          </FilterGroupWrap>
          <Divider style={{ width: 319, margin: '24px 0' }} />
          <FilterGroupWrap >
            <FilterGroupTitle>평점</FilterGroupTitle>
            <ChipRow>
              {['전체', '5점', '4점', '3점', '2점', '1점'].map(tone => (
                <Chip
                  key={tone}
                  selected={skinTone === tone}
                  onClick={() => setSkinTone(tone)}
                  style={{ padding: '0px 10px' }}
                >
                  {tone}
                </Chip>
              ))}
            </ChipRow>
          </FilterGroupWrap>
          <Divider style={{ width: 319, margin: '24px 0' }} />
          <AccordionHeader onClick={() => setShowCondition(v => !v)}>
            <AccordionLabelWrap>
              <CustomCheckbox
                checked={conditionChecked}
                onChange={e => setConditionChecked(e.target.checked)}
                onClick={e => e.stopPropagation()}
              />
              나의 피부 컨디션 정보 불러오기
            </AccordionLabelWrap>
            <AccordionIcon open={showCondition}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.4829 4.04322C12.203 3.77659 11.7599 3.78738 11.4933 4.06732L6.99985 8.7851L2.50709 4.06736C2.24047 3.7874 1.79739 3.77658 1.51743 4.04319C1.23747 4.3098 1.22665 4.75288 1.49326 5.03284L6.49293 10.2829C6.62506 10.4216 6.80822 10.5001 6.99979 10.5001C7.19136 10.5001 7.37458 10.4216 7.50671 10.2829L12.507 5.03288C12.7737 4.75293 12.7629 4.30985 12.4829 4.04322Z" fill="#3C3C3C"/>
              </svg>
            </AccordionIcon>
          </AccordionHeader>
          {showCondition && (
            <>
              <FilterGroupWrap style={{ paddingBottom: '10px' }}>
                <ConditionGroupTitle>피부타입</ConditionGroupTitle>
                <ChipRow>
                  {['지성', '건성', '복합성', '민감성', '약건성', '트러블성', '중성'].map(type => (
                    <RoundChip
                      key={type}
                      selected={selectedConditionType === type}
                      onClick={() => setSelectedConditionType(selectedConditionType === type ? null : type)}
                    >
                      {type}
                    </RoundChip>
                  ))}
                </ChipRow>
              </FilterGroupWrap>
              <FilterGroupWrap style={{ paddingBottom: '10px' }}>
                <ConditionGroupTitle>피부톤</ConditionGroupTitle>
                <ChipRow>
                  {['쿨톤', '웜톤', '봄웜톤', '여름쿨톤', '가을웜톤', '겨울쿨톤'].map(tone => (
                    <RoundChip
                      key={tone}
                      selected={selectedConditionTone === tone}
                      onClick={() => setSelectedConditionTone(selectedConditionTone === tone ? null : tone)}
                    >
                      {tone}
                    </RoundChip>
                  ))}
                </ChipRow>
              </FilterGroupWrap>
              <FilterGroupWrap style={{ paddingBottom: '15px' }}>
                <ConditionGroupTitle>피부 고민</ConditionGroupTitle>
                <ChipRow>
                  {['잡티', '미백', '주름', '각질', '트러블', '블랙헤드', '피지과다', '민감성', '모공', '탄력', '홍조', '아토피', '다크서클'].map(issue => (
                    <RoundChip
                      key={issue}
                      selected={selectedConditionIssues.includes(issue)}
                      onClick={() =>
                        setSelectedConditionIssues(prev =>
                          prev.includes(issue)
                            ? prev.filter(i => i !== issue)
                            : [...prev, issue]
                        )
                      }
                    >
                      {issue}
                    </RoundChip>
                  ))}
                </ChipRow>
              </FilterGroupWrap>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <ResetButton onClick={() => {
            setSkinType('전체');
            setSkinTone('전체');
            setSelectedConditionType(null);
            setSelectedConditionTone(null);
            setSelectedConditionIssues([]);
            if (onReset) onReset();
          }}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9964 1.7915C6.13252 1.7915 2.16661 5.67361 2.16661 10.4998C2.16661 15.3261 6.13252 19.2082 10.9964 19.2082C15.1045 19.2082 18.5659 16.4467 19.5507 12.6819C19.6905 12.1477 19.3707 11.6012 18.8364 11.4614C18.3021 11.3217 17.7556 11.6415 17.6158 12.1758C16.8607 15.0623 14.193 17.2082 10.9964 17.2082C7.20752 17.2082 4.16661 14.1922 4.16661 10.4998C4.16661 6.80755 7.20752 3.7915 10.9964 3.7915C13.3262 3.7915 15.3722 4.93042 16.6067 6.667H14.5415C13.9892 6.667 13.5415 7.11471 13.5415 7.667C13.5415 8.21928 13.9892 8.667 14.5415 8.667H18.7082C19.2605 8.667 19.7082 8.21928 19.7082 7.667V3.50033C19.7082 2.94805 19.2605 2.50033 18.7082 2.50033C18.1559 2.50033 17.7082 2.94805 17.7082 3.50033V4.83673C16.087 2.97109 13.6834 1.7915 10.9964 1.7915Z" fill="#3C3C3C" fill-opacity="0.75"/>
            </svg>
            초기화
          </ResetButton>
          <ApplyButton onClick={() => {
            const filterObj = {
              type: selectedConditionType === '전체' ? null : selectedConditionType,
              tone: selectedConditionTone === '전체' ? null : selectedConditionTone,
              issues: selectedConditionIssues,
              reviewType: skinType === '전체' ? null : skinType,
              rating: skinTone === '전체' ? null : (skinTone.replace('점', '') === skinTone ? null : Number(skinTone.replace('점', ''))),
            };
            onApply(filterObj);
          }}>적용하기</ApplyButton>
        </ModalFooter>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default FilterModal; 