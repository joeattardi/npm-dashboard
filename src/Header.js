import React from 'react';

import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Toolbar from './Toolbar';

import styles from './Header.module.scss';

export default function Header({ onRefresh, onAdd }) {
  return (
    <header id={styles.header}>
      <FontAwesomeIcon icon={faChartBar} size="2x" />
      <h1>npm dashboard</h1>
      <Toolbar onRefresh={onRefresh} onAdd={onAdd} />
    </header>
  )
}