import React, { useEffect, useState } from 'react';
import { getSamepleUserInfo } from '@/pages/api/api';
import { useRouter } from 'next/router';
import Card from '@/components/Card';
import styles from '@/styles/Shared.module.css';
import avatar from '@/public/avatar.svg';
import close from '@/public/close.svg';
import search from '@/public/search.svg';

interface folderLinkInfoProps {
  createdAt: Date | undefined;
  created_at: Date | undefined;
  description: string | null;
  imageSource: string | undefined;
  image_source: string | null;
  url: string | null;
}

interface FolderInfo {
  folderName: string;
  folderOwner: string;
  folderOwnerImg: string;
  folderLinks: folderLinkInfoProps[];
}

export default function Shared() {
  const [folderInfo, setFolderInfo] = useState<FolderInfo | null>(null);
  const router = useRouter();

  const handleLoadFolderInfo = async () => {
    try {
      const folderInfo = await getSamepleUserInfo();
      if (!folderInfo.folder) return;

      setFolderInfo({
        folderName: folderInfo.folder.name,
        folderOwner: folderInfo.folder.owner.name,
        folderOwnerImg: folderInfo.folder.owner.profileImageSource,
        folderLinks: folderInfo.folder.links,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoadFolderInfo();
  }, []);

  return (
    <>
      {folderInfo ? (
        <div className={styles.SharedContainer}>
          <div className={styles.SharedTitle}>
            <div className={styles.SharedProfile}>
              <img src={folderInfo.folderOwnerImg} alt='avatar img' />
              <span>{folderInfo.folderOwner}</span>
            </div>
            <h1>{folderInfo.folderName}</h1>
          </div>
          <div className={styles.SharedMain}>
            <div className={styles.SharedSeachBarContent}>
              <div className={styles.SeachContent}>
                <img src={search.src} alt='search img' />
                <input placeholder='링크를 검색해 보세요.' />
              </div>
              <img src={close.src} alt='close img' />
            </div>
            <Card
              folderLinkInfo={folderInfo.folderLinks}
              router={router.pathname}
            />
          </div>
        </div>
      ) : (
        <div className={styles.SharedContainer}>
          <div className={styles.SharedTitle}>
            <div className={styles.SharedProfile}>
              <img src={avatar.src} alt='avatar img' />
              <span>@코드잇</span>
            </div>
            <h1>⭐️ 즐겨찾기</h1>
          </div>
          <div className={styles.SharedMain}>
            <div className={styles.SharedSeachBarContent}>
              <div className={styles.SeachContent}>
                <img src={search.src} alt='search img' />
                <input placeholder='링크를 검색해 보세요.' />
              </div>
              <img src={close.src} alt='close img' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
