import React from 'react';
import styles from '@/styles/DeleteFolderModal.module.css';

interface Props {
  onClose: ModalCloseHandler;
}

type ModalCloseHandler = () => void;

export default function DeleteFolderModal({ onClose }: Props) {
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
          <div className={styles.TitleContent}>
            <h2>폴더 삭제</h2>
            <span>폴더명</span>
          </div>
          <button>삭제하기</button>
        </div>
        <button className={styles.ModalCloseBtn} onClick={handleClose} />
      </div>
    </div>
  );
}
