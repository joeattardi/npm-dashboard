import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';

import styles from './Toolbar.module.scss';

export default function Toolbar({ onRefresh, onAdd }) {
  return (
    <div id={styles.toolbar}>
      <button onClick={onAdd}><FontAwesomeIcon icon={faPlus} fixedWidth={true} /></button>
      <button onClick={onRefresh}><FontAwesomeIcon icon={faSync} fixedWidth={true} /></button>
    </div>
  );
}