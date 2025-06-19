// ScoreGraph molecule: 점수 그래프 묶음 컴포넌트
// 아토믹 디자인 - Molecules
// ---------------------------------------------
//
import React from "react";

type ScoreGraphProps = {
  bars: number[];
  styles: any;
};

const ScoreGraph = ({ bars, styles }: ScoreGraphProps) => (
  <div style={styles.graphBox}>
    <div style={styles.graphRow}>
      {bars.map((percent: number, idx: number) => (
        <div key={idx} style={styles.graphCol}>
          <div style={styles.graphPercent}>{percent}%</div>
          <div style={styles.graphBarWrap}>
            <div style={styles.graphBarBg} />
            <div style={{ ...styles.graphBar, height: `${percent * 0.48}px` }} />
          </div>
          <div style={styles.graphLabel}>{5 - idx}점</div>
        </div>
      ))}
    </div>
  </div>
);

export default ScoreGraph; 