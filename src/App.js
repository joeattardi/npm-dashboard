import React, { useEffect, useState } from 'react';

import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import AddTile from './AddTile';
import ConfirmationModal from './ConfirmationModal';
import Header from './Header';
import LoadingMessage from './LoadingMessage';
import Package from './Package';

import { getDownloadStatistics, getPackageData } from './apiClient';

import styles from './App.module.scss';

const packages = [
  '@joeattardi/emoji-button',
  'promise-poller',
  'json-colorizer',
  'svelte-tabs',
  'svelte-click-outside',
  'react'
];

ReactModal.setAppElement('#root');

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [downloads, setDownloads] = useState({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

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

  function showRemoveConfirmation(pkg) {
    setPackageToDelete(pkg);
    setShowConfirmModal(true);
  }

  function removePackage(pkg) {
    setData(Object.keys(data).filter(key => key !== pkg).reduce((newData, key) => {
      newData[key] = data[key];
      return newData;
    }, {}));
  }

  return (
    <>
      <div id={styles.app}>
        <ReactTooltip effect="solid" />
        <Header />
        <div id={styles.main}>
          {isLoading ? (
            <LoadingMessage />
          ) : (
            Object.keys(data).map(pkg => (
              <Package
                data={data[pkg]}
                downloads={downloads[pkg]}
                key={pkg}
                onRemoveClick={() => showRemoveConfirmation(pkg)}
              />
            ))
          )}
          {!isLoading ? <AddTile /> : null}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        pkg={packageToDelete}
        onConfirm={removePackage}
      />
    </>
  );
}

export default App;
