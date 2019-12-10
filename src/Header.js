import React from 'react';

import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header id={styles.header}>
      <FontAwesomeIcon icon={faChartLine} size="2x" />
      <h1>npm dashboard</h1>
    </header>
  )
}