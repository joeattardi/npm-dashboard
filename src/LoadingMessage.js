import React from 'react';

import Loader from 'react-loader-spinner';

import styles from './LoadingMessage.module.scss';

export default function LoadingMessage() {
  return (
    <div id={styles.loader}>
      <Loader height={100} width={100} color="#3891A6" type="Bars" />
      <h2>Crunching package data</h2>
    </div>
  );
}
