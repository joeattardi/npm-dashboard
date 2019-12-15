import React from "react";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import styles from "./Score.module.scss";

import { getPercentage } from "../util";

export default function Score({ label, score, name }) {
  const percentage = getPercentage(score);

  let className;
  if (percentage < 40) {
    className = "red";
  } else if (percentage < 70) {
    className = "yellow";
  } else {
    className = "green";
  }

  return (
    <div className={styles.score} data-tip={`${name}: ${percentage}%`}>
      <CircularProgressbarWithChildren
        className={className}
        value={score}
        maxValue={1}
        strokeWidth={15}
      >
        {label}
      </CircularProgressbarWithChildren>
    </div>
  );
}
