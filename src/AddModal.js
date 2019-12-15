import React, { useState } from 'react';

import { faCube } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from './Modal';

import styles from './AddModal.module.scss';

export default function AddModal({ isOpen, onClose, onAdd }) {
  const [pkg, setPkg] = useState('');

  function close() {
    onClose();
    setPkg('');
  }

  function add() {
    onAdd(pkg);
    close();
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
      width="20rem"
      height="15rem"
      buttons={
        <>
          <button onClick={onClose}>Cancel</button>
          <button disabled={!pkg} onClick={add}>Add</button>
        </>
      }
    >
      <FontAwesomeIcon icon={faCube} size="4x" />
      <h2>Add package</h2>
      <input
        autoFocus
        id={styles['package-input']}
        type="text"
        value={pkg}
        onChange={onChangePackage}
        onKeyDown={onInputKeyDown}
      />
    </Modal>
  );
}
