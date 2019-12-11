import React, { useEffect, useState } from 'react';

import ReactTooltip from 'react-tooltip'

import Header from './Header';
import LoadingMessage from './LoadingMessage';
import Package from './Package';

import { getDownloadStatistics, getPackageData } from './apiClient';

import styles from './App.module.scss';

const packages = ['@joeattardi/emoji-button', 'promise-poller', 'json-colorizer', 'svelte-tabs', 'svelte-click-outside', 'react'];

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [downloads, setDownloads] = useState({});

  useEffect(() => {
    loadData();

    async function loadData() {
      const packageData = await getPackageData(packages);
      setData(packageData);

      const downloadsData = await getDownloadStatistics(packages);
      setDownloads(downloadsData);

      setLoading(false);
      ReactTooltip.rebuild();
    }
  }, []);

  return (
    <div id={styles.app}>
      <ReactTooltip effect="solid" />
      <Header />
      <div id={styles.main}>
        {isLoading ? <LoadingMessage /> : Object.keys(data).map(pkg => <Package data={data[pkg]} downloads={downloads[pkg]} key={pkg} />)}
      </div>
    </div>
  );
}

export default App;
