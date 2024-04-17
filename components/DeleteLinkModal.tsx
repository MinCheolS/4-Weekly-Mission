import React from 'react';
import styles from '@/styles/DeleteLinkModal.module.css';

interface LinksInfoProps {
  created_at: Date;
  description: string | null;
  id: number;
  image_source: string | null;
  url: string;
}

interface DeleteLinkModalProps {
  onClose: () => void;
  linksInfo: LinksInfoProps;
}

export default function DeleteLinkModal({
  onClose,
  linksInfo,
}: DeleteLinkModalProps) {
  const handleClose = () => {
    onClose();
  };
  console.log(linksInfo);
  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.ModalContainer} onClick={handleClose}>
      <div className={styles.ContentContainer} onClick={handleStopEvent}>
        <div className={styles.ModalContent}>
          <div className={styles.TitleContent}>
            <h2>폴더 삭제</h2>
            <span>httpw://www.abc.com</span>
          </div>
          <button>삭제하기</button>
        </div>
        <button className={styles.ModalCloseBtn} onClick={handleClose} />
      </div>
    </div>
  );
}
