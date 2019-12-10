import React from 'react';

import ReactTooltip from 'react-tooltip'

import Header from './Header';
import Package from './Package';

import data from './data.json';
import downloads from './downloads.json';

import styles from './App.module.scss';

function App() {
  return (
    <div id={styles.app}>
      <Header />
      <div id={styles.main}>
        {Object.keys(data).map(pkg => <Package data={data[pkg]} downloads={downloads[pkg]} key={pkg} />)}
      </div>
      <ReactTooltip effect="solid" />
    </div>
  );
}

export default App;
