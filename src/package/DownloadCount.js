import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import abbreviate from 'number-abbreviate';

import { getPercentage } from '../util';

import styles from './DownloadCount.module.scss';

export default function DownloadCount({ label, count, previous }) {
  let change;
  let changePercent;
  let changeClassName;
  let changeIcon;

  if (previous) {
    change = count - previous;
    changePercent = Math.abs(getPercentage(change / previous));

    if (change < 0) {
      changeClassName = styles.down;
      changeIcon = faArrowDown;
    } else if (change > 0) {
      changeClassName = styles.up;
      changeIcon = faArrowUp;
    }
  }

  return (
    <div className={styles['download-count']}>
      <div className={styles.label}>{label}</div>
      <div className={styles.count}>
        <span data-tip={count.toLocaleString()}>{abbreviate(count, 1)}</span>
        {changePercent > 0 ? (
          <span className={`${styles.change} ${changeClassName}`} data-tip={`Previous: ${previous.toLocaleString()}`}>
            <FontAwesomeIcon icon={changeIcon} /> {changePercent}%
          </span>
        ) : null}
      </div>
    </div>
  );
}
