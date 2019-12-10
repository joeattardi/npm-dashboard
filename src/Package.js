import React from 'react';

import { faCube, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styles from './Package.module.scss';

export default function Package({ data }) {
  const metadata = data.collected.metadata;

  return (
    <div className={styles.package}>
      <div className={styles.name}>
        <FontAwesomeIcon icon={faCube} size="lg" /> 
        <h2>{metadata.name}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.version}>
          <div>
            <FontAwesomeIcon icon={faTag} size="sm" /> v{metadata.version}
          </div>
          <div className={styles.date}>{formatDistanceToNow(new Date(metadata.date), { addSuffix: true })}</div>
        </div>
      </div>
    </div>
  );
}
