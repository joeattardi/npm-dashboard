import React from 'react';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';

import styles from './ConfirmationModal.module.scss';

export default function ConfirmationModal({ isOpen, pkg, onClose, onConfirm }) {
  function confirm() {
    onClose();
    onConfirm(pkg);
  }

  return (
    <ReactModal
      closeTimeoutMS={250}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onClose}
      isOpen={isOpen}
      style={{
        content: {
          width: '20rem',
          height: '15rem',
          margin: 'auto'
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles['modal-body']}>
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
          <h2>Are you sure?</h2>
          <p>Do you really want to remove the package <strong>{pkg}</strong> from the dashboard?</p>
        </div>
        <div className={styles['modal-buttons']}>
          <button onClick={onClose}>Cancel</button>
          <button className={styles.remove} onClick={confirm}>Remove</button>
        </div>
      </div>
    </ReactModal>
  );
}
