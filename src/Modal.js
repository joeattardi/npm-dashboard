import React from 'react';

import ReactModal from 'react-modal';

import styles from './Modal.module.scss';

export default function Modal({ isOpen, onClose, children, buttons, maxWidth, maxHeight }) {
  return (
    <ReactModal
      closeTimeoutMS={250}
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: 'calc(100% - 120px)',
          height: 'calc(100% - 120px)',
          maxWidth,
          maxHeight,
          margin: 'auto'
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles['modal-body']}>
          {children}
        </div>
        <div className={styles['modal-buttons']}>
          {buttons}
        </div>
      </div>
    </ReactModal>
  );
}
