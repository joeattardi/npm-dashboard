import React from 'react';

import styles from './DownloadCount.module.scss';

export default function DownloadCount({ label, count }) {
  return (
    <div className={styles['download-count']}>
      <div className={styles.label}>{label}</div>
      <div className={styles.count}>{count.toLocaleString()}</div>
    </div>
  );
}