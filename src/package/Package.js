import React from 'react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCube,
  faCloudDownloadAlt,
  faProjectDiagram,
  faStar,
  faTag,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import abbreviate from 'number-abbreviate';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Gravatar from 'react-gravatar';

import DownloadCount from './DownloadCount';
import OverallScore from './OverallScore';
import Score from './Score';

import styles from './Package.module.scss';

export default function Package({ data, downloads, onRemoveClick, isAdded }) {
  const metadata = data.collected.metadata;
  const score = data.score;

  return (
    <div className={`tile ${styles.package} ${isAdded ? styles.added : ''}`}>
      <div className={styles.name}>
        <FontAwesomeIcon icon={faCube} size="lg" />
        <h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={metadata.links.npm}
          >
            {metadata.name}
          </a>
        </h2>
        <button className={styles['close-button']} onClick={onRemoveClick}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={styles.details}>
        <div className={styles.version}>
          <div>
            <FontAwesomeIcon icon={faTag} size="sm" /> {metadata.version}
          </div>
          <div className={styles.date}>
            {formatDistanceToNow(new Date(metadata.date), { addSuffix: true })}
          </div>
          {metadata.author ? (
            <div className={styles.avatar} data-tip={metadata.author.name}>
              <Gravatar email={metadata.author.email} size={25} />
            </div>
          ) : null}
        </div>
        <div className={styles.meta}>
          <div
            data-tip={`${data.collected.npm.dependentsCount.toLocaleString()} dependents`}
          >
            <FontAwesomeIcon icon={faProjectDiagram} />{' '}
            {abbreviate(data.collected.npm.dependentsCount, 1)}
          </div>
          <div
            data-tip={`${data.collected.npm.starsCount.toLocaleString()} stars on npm`}
          >
            <FontAwesomeIcon icon={faStar} />{' '}
            {abbreviate(data.collected.npm.starsCount, 1)}
          </div>
          {data.collected.github && (
            <div
              data-tip={`${data.collected.github.starsCount.toLocaleString()} stars on GitHub`}
            >
              <FontAwesomeIcon icon={faGithub} />{' '}
              {abbreviate(data.collected.github.starsCount, 1)}
            </div>
          )}
        </div>
        <div className={styles['section-title']}>
          <FontAwesomeIcon size="sm" icon={faStar} /> <span>Score</span>
        </div>
        <div className={styles.scores}>
          <Score score={score.detail.quality} name="Quality" label="Q" />
          <Score score={score.detail.popularity} name="Popularity" label="P" />
          <Score
            score={score.detail.maintenance}
            name="Maintenance"
            label="M"
            data-tip="shit"
          />
          <OverallScore score={score.final} />
        </div>
        <div className={styles['section-title']}>
          <FontAwesomeIcon size="sm" icon={faCloudDownloadAlt} />{' '}
          <span>Downloads</span>
        </div>
        <div className={styles.downloads}>
          {downloads && downloads.lastWeek ? (
            <DownloadCount
              label="Last week"
              count={downloads.lastWeek}
              previous={downloads.previousWeek}
            />
          ) : null}
          <div style={{ flexGrow: 1 }}></div>
          {downloads && downloads.lastMonth ? (
            <DownloadCount
              label="Last month"
              count={downloads.lastMonth}
              previous={downloads.previousMonth}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
