import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import styles from './Toolbar.module.scss';

export default function Toolbar({ onRefresh }) {
  return (
    <div id={styles.toolbar}>
      <button onClick={onRefresh}><FontAwesomeIcon icon={faSync} fixedWidth={true} /></button>
    </div>
  );
}