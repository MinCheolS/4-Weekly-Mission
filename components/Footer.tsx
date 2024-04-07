import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import facebook from '@/public/facebook.svg';
import twitter from '@/public/twitter.svg';
import youtube from '@/public/youtube.svg';
import instagram from '@/public/instagram.svg';

export default function Footer() {
  return (
    <div className={styles.FooterContainer}>
      <div className={styles.FooterContent}>
        <span>©codeit - 2023</span>
        <div className={styles.FooterLink}>
          <Link href='/privacy'>Privacy Policy</Link>
          <Link href='/faq'>FAQ</Link>
        </div>
        <div className={styles.FooterSns}>
          <Link href='https://www.facebook.com/' target='_blank'>
            <img src={facebook.src} alt='facebook logo' />
          </Link>
          <Link href='https://twitter.com/' target='_blank'>
            <img src={twitter.src} alt='twitter logo' />
          </Link>
          <Link href='https://www.youtube.com/' target='_blank'>
            <img src={youtube.src} alt='youtube logo' />
          </Link>
          <Link href='https://www.instagram.com/' target='_blank'>
            <img src={instagram.src} alt='instagram logo' />
          </Link>
        </div>
      </div>
    </div>
  );
}
