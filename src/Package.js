import React from 'react';

import { faBox, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import DownloadCount from './DownloadCount';
import Score from './Score';
import { getPercentage } from './util';

import styles from './Package.module.scss';

export default function Package({ data, downloads }) {
  const metadata = data.collected.metadata;
  const score = data.score;

  return (
    <div className={styles.package}>
      <div className={styles.name}>
        <FontAwesomeIcon icon={faBox} size="lg" /> 
        <h2>{metadata.name}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.version}>
          <div>
            <FontAwesomeIcon icon={faTag} size="sm" /> v{metadata.version}
          </div>
          <div className={styles.date}>{formatDistanceToNow(new Date(metadata.date), { addSuffix: true })}</div>
        </div>
        <div className={styles.scores}>
          <Score score={score.detail.quality} name="Quality" label="Q" />
          <Score score={score.detail.popularity} name="Popularity" label="P" />
          <Score score={score.detail.maintenance} name="Maintenance" label="M" data-tip="shit" />
          <div className={styles['overall-score']} data-tip={`Overall score: ${getPercentage(score.final)}%`}>
            {getPercentage(score.final)}
          </div>
        </div>
        <div className={styles['downloads-title']}>Downloads</div>
        <div className={styles.downloads}>
          <DownloadCount label="Last week" count={downloads.lastWeek} />
          <div style={{ flexGrow: 1 }}></div>
          <DownloadCount label="Last month" count={downloads.lastMonth} />
        </div>
      </div>
    </div>
  );
}
