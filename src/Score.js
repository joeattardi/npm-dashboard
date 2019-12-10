import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import styles from './Score.module.scss';

import { getPercentage } from './util';

export default function Score({ label, score, name }) {
  return (
    <div className={styles.score} data-tip={`${name}: ${getPercentage(score)}%`}>
      <CircularProgressbar
        value={score}
        maxValue={1}
        strokeWidth={15}
        text={label}
        styles={buildStyles({
          textSize: "3rem",
          pathColor: '#5D737E',
          textColor: '#5D737E'
        })}
      />
    </div>
  );
}
