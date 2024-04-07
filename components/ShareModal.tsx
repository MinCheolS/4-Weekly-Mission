import React from 'react';
import styles from '@/styles/ShareModal.module.css';
import kakao from '@/public/kakao.svg';
import facebook from '@/public/facebook.svg';
import link from '@/public/link.svg';

interface Props {
  onClose: ModalCloseHandler;
  selectFolder: any;
}

type ModalCloseHandler = () => void;

export default function ShareModal({ onClose, selectFolder }: Props) {
  const currentFolderId = selectFolder;
  const sharedLink = `${window.location.origin}/shared/${currentFolderId}`;

  const shareToCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(sharedLink);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드에 링크를 복사하는 중에 오류가 발생했습니다.');
    }
  };

  const shareToFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
  };

  const shareToKakao = () => {
    // if (window.Kakao) {
    //   const kakao = window.Kakao;
    //   if (!kakao.isInitialized()) {
    //     kakao.init(process.env.REACT_APP_KAKAO_KEY);
    //   }
    //   kakao.Share.sendScrap({
    //     requestUrl: sharedLink,
    //     templateId: 104703,
    //   });
    //   kakao.cleanup();
    // }
  };

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
            <h2>폴더 공유</h2>
            <span>폴더명</span>
          </div>
          <div className={styles.LinksContent}>
            <div className={styles.LinkContent} onClick={shareToKakao}>
              <img src={kakao.src} alt='kakao img' />
              <span>카카오톡</span>
            </div>
            <div className={styles.LinkContent} onClick={shareToFacebook}>
              <img src={facebook.src} alt='facebook img' />
              <span>페이스북</span>
            </div>
            <div className={styles.LinkContent} onClick={shareToCopyLink}>
              <img src={link.src} alt='link img' />
              <span>링크복사</span>
            </div>
          </div>
        </div>
        <button className={styles.ModalCloseBtn} onClick={handleClose} />
      </div>
    </div>
  );
}
