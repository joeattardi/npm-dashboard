import React, { useCallback, useEffect } from 'react';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '../Modal';

import styles from './ConfirmDeleteModal.module.scss';

export default function ConfirmDeleteModal({
  isOpen,
  pkg,
  onClose,
  onConfirm
}) {
  const confirm = useCallback(() => {
    onClose();
    onConfirm(pkg);
  }, [onClose, onConfirm, pkg]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Enter' && isOpen) {
        confirm();
      }
    }

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [confirm, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="20rem"
      maxHeight="15rem"
      buttons={
        <>
          <button onClick={onClose}>Cancel</button>
          <button className={styles.remove} onClick={confirm}>
            Remove
          </button>
        </>
      }
    >
      <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
      <h2>Are you sure?</h2>
      <p>
        Do you really want to remove the package <strong>{pkg}</strong> from the
        dashboard?
      </p>
    </Modal>
  );
}
