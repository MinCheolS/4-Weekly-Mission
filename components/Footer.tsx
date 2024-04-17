import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import facebook from '@/public/facebook.svg';
import twitter from '@/public/twitter.svg';
import youtube from '@/public/youtube.svg';
import instagram from '@/public/instagram.svg';

export default function Footer() {
  const SNS_LINKS = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/',
      imgSrc: facebook.src,
    },
    { name: 'Twitter', url: 'https://twitter.com/', imgSrc: twitter.src },
    { name: 'YouTube', url: 'https://www.youtube.com/', imgSrc: youtube.src },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      imgSrc: instagram.src,
    },
  ];

  return (
    <div className={styles.FooterContainer}>
      <div className={styles.FooterContent}>
        <span>©codeit - 2023</span>
        <div className={styles.FooterLink}>
          <Link href='/privacy'>Privacy Policy</Link>
          <Link href='/faq'>FAQ</Link>
        </div>
        <div className={styles.FooterSns}>
          {SNS_LINKS.map(({ name, url, imgSrc }) => (
            <Link key={name} href={url} target='_blank'>
              <img src={imgSrc} alt={`${name} logo`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
