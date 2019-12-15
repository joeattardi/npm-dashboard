import React from 'react';

import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Toolbar from './Toolbar';

import styles from './Header.module.scss';

export default function Header({ onRefresh }) {
  return (
    <header id={styles.header}>
      <FontAwesomeIcon icon={faChartLine} size="2x" />
      <h1>npm dashboard</h1>
      <Toolbar onRefresh={onRefresh} />
    </header>
  )
}