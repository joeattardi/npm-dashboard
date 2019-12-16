import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <div id={styles.name}>Created by <a target="_blank" rel="noopener noreferrer" href="https://joeattardi.codes">Joe Attardi</a></div> 
      <div id={styles.links}>
        <a href="mailto:jattardi@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/joeattardi/npm-dashboard"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
    </footer>
  );
}
