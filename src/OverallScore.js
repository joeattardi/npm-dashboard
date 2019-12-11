import React from "react";

import { getPercentage } from "./util";

import styles from "./OverallScore.module.scss";

export default function OverallScore({ score }) {
  const percentage = getPercentage(score);

  let className;
  if (percentage < 40) {
    className = styles.red;
  } else if (percentage < 70) {
    className = styles.yellow;
  } else {
    className = styles.green;
  }
  
  return (
    <div
      className={`${styles["overall-score"]} ${className}`}
      data-tip={`Overall score: ${percentage}%`}
    >
      {percentage}
    </div>
  );
}
