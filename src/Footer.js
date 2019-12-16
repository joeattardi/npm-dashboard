import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <div id={styles.name}>Created by <a href="https://joeattardi.codes">Joe Attardi</a></div> 
      <div><a href="https://github.com/joeattardi/npm-dashboard"><FontAwesomeIcon icon={faGithub} size="lg" /></a></div>
    </footer>
  );
}
