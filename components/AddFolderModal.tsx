import React from 'react';
import styles from '@/styles/AddFolderModal.module.css';

interface AddFolderModalProps {
  onClose: () => void;
}

export default function AddFolderModal({ onClose }: AddFolderModalProps) {
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
          <h2>폴더 추가</h2>
          <div className={styles.InputContent}>
            <input placeholder='내용 입력' />
            <button>추가하기</button>
          </div>
        </div>
        <button onClick={handleClose} />
      </div>
    </div>
  );
}
