import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Card.module.css';
import undefinedImg from '@/public/undefinedImg.svg';
import star from '@/public/star.svg';
import kebab from '@/public/kebab.svg';

interface Props {
  folderLinkInfo: folderLinkInfoProps[];
  handleOpenModal?: (name: string) => void;
  filterLinks?: folderLinkInfoProps[];
  router: string;
}

interface folderLinkInfoProps {
  createdAt: Date | undefined;
  created_at: Date | undefined;
  description: string | null;
  imageSource: string | undefined;
  image_source: string | null;
  url: string | null;
}

export default function Card({
  folderLinkInfo,
  handleOpenModal,
  filterLinks,
  router,
}: Props) {
  const [isSelete, setIsSelete] = useState(null);

  const getCreateDate = (created_at: Date) => {
    const createDate = new Date(created_at);
    const formattedDate = `${createDate.getFullYear()}. ${
      createDate.getMonth() + 1
    }. ${createDate.getDate()}`;
    return formattedDate;
  };

  const getTimeDifference = (created_at: Date) => {
    const createDate = new Date(created_at);
    const currentDate = new Date();
    const differenceIntime: number = Math.floor(
      (currentDate.getTime() - createDate.getTime()) / 1000
    );

    const timeInMinute = 60;
    const timeInHour = 3600;
    const timeInDay = 86400;
    const timeInMonth = 2592000;
    const timeInYear = 31536000;

    if (differenceIntime <= timeInMinute) {
      return '1 minute ago';
    } else if (differenceIntime <= timeInHour) {
      const minutes = Math.floor(differenceIntime / timeInMinute);
      return `${minutes} minutes ago`;
    } else if (differenceIntime < timeInDay) {
      const hours = Math.floor(differenceIntime / timeInHour);
      return `${hours} hours ago`;
    } else if (differenceIntime < timeInMonth) {
      const days = Math.floor(differenceIntime / timeInDay);
      return `${days} days ago`;
    } else if (differenceIntime < timeInYear) {
      const months = Math.floor(differenceIntime / timeInMonth);
      return `${months} months ago`;
    } else {
      const years = Math.floor(differenceIntime / timeInYear);
      const remainingMonth = Math.floor(
        (differenceIntime % timeInYear) / timeInMonth
      );

      if (remainingMonth > 0) return `${years} years ago`;
      else return `${years} years ago`;
    }
  };

  const handleOnOffSelete = (id: null) => {
    setIsSelete(isSelete === id ? null : id);
  };

  const filteredLinks = filterLinks
    ? filterLinks.length === 0
      ? folderLinkInfo
      : filterLinks
    : undefined;

  const locationLink = router === '/shared' ? folderLinkInfo : filteredLinks;

  return (
    <div className={styles.SharedCardContent}>
      {folderLinkInfo.length !== 0 ? (
        locationLink?.map((link: any) => {
          const {
            createdAt,
            created_at,
            description,
            imageSource,
            image_source,
            url,
          } = link;
          const createDate = getCreateDate(created_at || createdAt);
          const timeDifference = getTimeDifference(created_at || createdAt);
          console.log(link.id);
          console.log('isSelete', isSelete);
          return (
            <div key={link.id} className={styles.CardContent}>
              <Link href={url} target='_black'>
                <img
                  className={styles.CardImage}
                  src={image_source || imageSource || undefinedImg.src}
                  alt='card img'
                />
              </Link>
              <div className={styles.CardInfo}>
                <div className={styles.CardInfoHeader}>
                  <span>{timeDifference}</span>
                  <img
                    onClick={() => handleOnOffSelete(link.id)}
                    src={kebab.src}
                    alt='kebab img'
                  />
                  {isSelete === link.id && (
                    <div className={styles.CardBtnContent}>
                      {handleOpenModal && (
                        <button
                          onClick={() => handleOpenModal('DeleteLinkModal')}
                        >
                          삭제하기
                        </button>
                      )}
                      {handleOpenModal && (
                        <button onClick={() => handleOpenModal('AddLinkModal')}>
                          폴더에 추가
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <p>{description || `No description`}</p>
                <span>{createDate}</span>
              </div>
              <img src={star.src} alt='star img' />
            </div>
          );
        })
      ) : (
        <div className={styles.FolderLinkNoneList}>
          <p>저장된 링크가 없습니다</p>
        </div>
      )}
    </div>
  );
}
