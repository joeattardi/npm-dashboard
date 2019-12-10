import React from 'react';

import Header from './Header';
import Package from './Package';
import data from './data.json';

import styles from './App.module.scss';

function App() {
  return (
    <div id={styles.app}>
      <Header />
      <div id={styles.main}>
        {Object.keys(data).map(pkg => <Package data={data[pkg]} key={pkg} />)}
      </div>
    </div>
  );
}

export default App;
