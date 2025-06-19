// SatisfactionRow molecule: 만족도 한 줄 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";

type SatisfactionDetail = {
  label: string;
  percent: number;
  highlight?: boolean;
};

type SatisfactionRowProps = {
  label: string;
  value: string;
  percent: number;
  styles: any;
  detail?: SatisfactionDetail[]; // 상세 항목 배열
};

const SatisfactionRow = ({
  label,
  value,
  percent,
  styles,
  detail,
}: SatisfactionRowProps) => {
  // detail이 2개 이상일 때만 상세 그래프 보임
  const showDetail = detail && detail.length > 1;

  return (
    <div style={{ marginBottom: showDetail ? 16 : 0 }}>
      <div style={styles.satisfactionRow}>
        <div style={styles.satisfactionLabel}>{label}</div>
        <div style={styles.satisfactionValue}>{value}</div>
        <div style={styles.satisfactionDash} />
        <div style={styles.satisfactionPercent}>{percent}%</div>
      </div>

      {showDetail && (
        <div style={{ marginTop: 8 }}>
          {detail.map((d) => (
            <div
              key={d.label}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
                paddingRight: 4,
              }}
            >
              <div
                style={{
                  width: 80,
                  fontSize: 12,
                  color: d.highlight ? "#222" : "#8994A2",
                  textAlign: "left",
                  fontWeight: d.highlight ? 600 : 400,
                  height: 26,
                  display: 'flex',
                  alignItems: 'center',
                  
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  flex: 1,
                  margin: "0 8px",
                  height: 4,
                  borderRadius: 3,
                  background: "#E5E7EA",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: 4,
                    borderRadius: 3,
                    width: `${d.percent}%`,
                    background: d.highlight ? "#FF5753" : "#BFC5CC",
                    transition: "width 0.3s",
                  }}
                />
              </div>
              <div
                style={{
                  width: 32,
                  textAlign: "right",
                  fontSize: 12,
                  color: d.highlight ? "#FF5753" : "#8994A2",
                  fontWeight: d.highlight ? 600 : 400,
                }}
              >
                {d.percent}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SatisfactionRow; 