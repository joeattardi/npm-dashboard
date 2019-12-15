import React from 'react';

import Loader from 'react-loader-spinner';

import styles from './LoadingTile.module.scss';

export default function LoadingTile() {
  return (
    <div className={styles['loading-tile']}>
      <Loader type="Bars" color="#CCCCCC" />
    </div>
  );
}
