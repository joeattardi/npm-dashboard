import React from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './AddTile.module.scss';

export default function AddTile() {
  return (
    <div id={styles['add-tile']}>
      <FontAwesomeIcon icon={faPlus} size="3x" />
    </div>
  )
}