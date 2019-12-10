import React from 'react';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header id={styles.header}>
      <h1>npm dashboard</h1>
    </header>
  )
}