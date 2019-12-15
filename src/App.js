import React, { useCallback, useEffect, useState } from 'react';

import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import AddModal from './AddModal';
import AddTile from './AddTile';
import ConfirmDeleteModal from './package/ConfirmDeleteModal';
import Header from './Header';
import LoadingMessage from './LoadingMessage';
import Package from './package/Package';

import { getDownloadStatistics, getPackageData } from './apiClient';

import styles from './App.module.scss';

const LOCAL_STORAGE_KEY = 'packages';

ReactModal.setAppElement('#root');

function App() {
  const [packages, setPackages] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [downloads, setDownloads] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const loadData = useCallback(async () => {
    if (packages && packages.length) {
      setLoading(true);

      const packageData = await getPackageData(packages);
      setData(packageData);

      const downloadsData = await getDownloadStatistics(packages);
      setDownloads(downloadsData);

      setLoading(false);
      ReactTooltip.rebuild();
    }
  }, [packages]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setPackages(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  }, []);
  
  useEffect(() => {
    if (packages) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(packages));
    }
  }, [packages]);

  function showRemoveConfirmation(pkg) {
    setPackageToDelete(pkg);
    setShowConfirmModal(true);
  }

  function removePackage(pkg) {
    setData(
      Object.keys(data)
        .filter(key => key !== pkg)
        .reduce((newData, key) => {
          newData[key] = data[key];
          return newData;
        }, {})
    );

    setPackages(packages.filter(p => p !== pkg));
  }

  function addPackage(pkg) {
    setPackages([
      ...packages,
      pkg
    ]);
  }

  function refresh() {
    // loadData();
  }

  return (
    <>
      <div id={styles.app}>
        <ReactTooltip effect="solid" />
        <Header onRefresh={refresh} onAdd={() => setShowAddModal(true)} />
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
          {!isLoading ? (
            <AddTile onClick={() => setShowAddModal(true)} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        pkg={packageToDelete}
        onConfirm={removePackage}
      />
      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addPackage}
        packages={packages}
      />
    </>
  );
}

export default App;
