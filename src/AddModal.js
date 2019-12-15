import React, { useState, useRef } from 'react';

import { faCube, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loader-spinner';

import { packageExists } from './apiClient';

import Modal from './Modal';

import styles from './AddModal.module.scss';

export default function AddModal({ isOpen, onClose, onAdd, packages }) {
  const [isLoading, setLoading] = useState(false);
  const [pkg, setPkg] = useState('');
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState(faCube);
  const [iconClasses, setIconClasses] = useState(styles.icon);

  const inputField = useRef();

  function close() {
    onClose();
    setTimeout(() => {
      setPkg('');
      setError(null);
      setLoading(false);
      setIcon(faCube);
      setIconClasses(styles.icon);
    }, 250);
  }

  async function validate() {
    const packageName = pkg.trim();
    if (packages.indexOf(packageName) >= 0) {
      return `Package "${packageName}" already exists in the dashboard`;
    }

    const result = await packageExists(packageName);
    if (!result) {
      return `Package "${packageName}" not found`;
    }
  }

  async function add() {
    setLoading(true);
    const errorMessage = await validate();
    if (errorMessage) {
      setLoading(false);
      setError(errorMessage);
      setPkg('');
      inputField.current.focus();
    } else {
      setIconClasses(`${styles.icon} ${styles.hide}`);
      setTimeout(() => {
        setIcon(faCheck);
        setIconClasses(`${styles.icon} ${styles.success}`);
        setTimeout(() => {
          onAdd(pkg.trim());
          close();
        }, 500);
      }, 500);
    }
  }

  function onChangePackage(event) {
    setPkg(event.target.value);
  }

  function onInputKeyDown(event) {
    if (event.key === 'Enter' && !!pkg) {
      add();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      width="25rem"
      height="20rem"
      buttons={
        <>
          <button onClick={close}>Cancel</button>
          <button
            disabled={!pkg || isLoading}
            onClick={add}
            style={{ width: '6rem' }}
          >
            {isLoading ? (
              <Loader height={13} width={13} color="#FFFFFF" type="Oval" />
            ) : (
              <span>Add</span>
            )}
          </button>
        </>
      }
    >
      <div className={iconClasses}><FontAwesomeIcon icon={icon} size="4x" /></div>
      <h2>Add package</h2>
      <p className={styles.error}>{error ? error : <span>&nbsp;</span>}</p>
      <input
        autoFocus
        placeholder="Package name"
        ref={inputField}
        id={styles['package-input']}
        type="text"
        value={pkg}
        onChange={onChangePackage}
        onKeyDown={onInputKeyDown}
      />
    </Modal>
  );
}
