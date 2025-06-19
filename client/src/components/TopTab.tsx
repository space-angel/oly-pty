import React from "react";

const TABS = [
  { key: "desc", label: "상품설명" },
  { key: "review", label: "리뷰", count: "999+" },
  { key: "qna", label: "Q&A", count: "137" },
];

const selectedKey = "review";

const TopTab = ({ stickyTop = 0 }: { stickyTop?: number }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: stickyTop,
        transition: "top 0.35s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 100,
        width: "100%",
        height: 44,
        background: "#fff",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid #EDEDF0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0px 36px",
        gap: 16,
        fontFamily: "Pretendard JP, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {TABS.map((tab) => {
        const isSelected = tab.key === selectedKey;
        return (
          <div
            key={tab.key}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: tab.key === "desc" ? 56 : tab.key === "review" ? 63 : 58,
              height: 44,
              gap: 4,
              margin: tab.key === "review" ? "0 auto" : undefined,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 4,
                width: tab.key === "desc" ? 56 : tab.key === "review" ? 63 : 58,
                height: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: tab.key === "desc" ? 56 : tab.key === "review" ? 28 : 32,
                  height: 22,
                  fontWeight: isSelected
                    ? 600
                    : tab.key === "desc"
                    ? 500
                    : 400,
                  fontSize: 16,
                  lineHeight: "22px",
                  color: isSelected ? "#222" : "#868B94",
                  justifyContent: "center",
                }}
              >
                {tab.label}
              </div>
              {tab.count && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: tab.key === "review" ? 31 : 20,
                    height: 16,
                    fontWeight: isSelected
                      ? 500
                      : 400,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: isSelected ? "#222" : "#868B94",
                    justifyContent: "center",
                  }}
                >
                  {tab.count}
                </div>
              )}
            </div>
            {/* 선택된 탭이면 진한 바 */}
            {isSelected && (
              <div
                style={{
                  position: "absolute",                  
                  bottom: 0,
                  width: '100%',
                  height: 2,
                  background: "#222",
                  borderRadius: 1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopTab; 