import React from 'react';
import styles from '@/styles/EditModal.module.css';

interface Props {
  onClose: ModalCloseHandler;
}

type ModalCloseHandler = () => void;

export default function EditModal({ onClose }: Props) {
  const handleClose = () => {
    onClose();
  };

  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.ModalContainer} onClick={handleClose}>
      <div className={styles.ContentContainer} onClick={handleStopEvent}>
        <div className={styles.ModalContent}>
          <h2>폴더 이름 변경</h2>
          <div className={styles.InputContent}>
            <input />
            <button>변경하기</button>
          </div>
        </div>
        <button className={styles.ModalCloseBtn} onClick={handleClose} />
      </div>
    </div>
  );
}
