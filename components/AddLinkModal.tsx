import React, { useState } from 'react';
import styles from '@/styles/AddLinkModal.module.css';

interface FolderInfo {
  id: number;
  name: string;
  created_at?: Date;
  link: LinkCount;
}

interface LinkCount {
  count: number;
}

interface Props {
  onClose: ModalCloseHandler;
  folderInfo: FolderInfo[];
}

interface LinkFolderContentProps {
  selected: boolean;
  onClick: () => void;
}

type ModalCloseHandler = () => void;

export default function AddLinkModal({ onClose, folderInfo }: Props) {
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);

  const handleClose = () => {
    onClose();
  };

  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLinkFolderClick = (id: null | number) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  return (
    <div className={styles.ModalContainer} onClick={handleClose}>
      <div className={styles.ContentContainer} onClick={handleStopEvent}>
        <div className={styles.ModalContent}>
          <div className={styles.TitleContent}>
            <h2>폴더에 추가</h2>
            <span>링크 주소</span>
          </div>
          <div className={styles.LinksFolderContent}>
            {folderInfo.slice(1).map((item) => (
              <div
                className={styles.LinkFolderContent}
                key={item.id}
                onClick={() => handleLinkFolderClick(item.id)}
                // selected={selectedItemId === item.id}
              >
                <div className={styles.FolderContent}>
                  <div>{item.name}</div>
                  <span>{item.link.count}개의 링크</span>
                </div>
              </div>
            ))}
          </div>
          <button>추가하기</button>
        </div>
        <button className={styles.ModalCloseBtn} onClick={handleClose} />
      </div>
    </div>
  );
}
