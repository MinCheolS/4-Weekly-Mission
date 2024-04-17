import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserInfo } from '@/pages/api/api';
import styles from '@/styles/Header.module.css';
import logo from '@/public/logo.svg';
import { useRouter } from 'next/router';

export default function Header() {
  const [user, setUser] = useState({
    email: undefined,
    image_source: undefined,
  });
  const router = useRouter();
  const headerStyle: React.CSSProperties = {
    position: router.pathname !== '/folder' ? `sticky` : 'relative',
  };

  const handleLoadUser = async () => {
    const response = await getUserInfo();
    const [userData] = response.data;
    const { email, image_source } = userData;

    if (!email) {
      throw new Error('유효한 이메일이 없습니다.');
    }
    setUser({ email, image_source });
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  return (
    <div className={styles.HeaderContainer} style={headerStyle}>
      <div className={styles.HeaderContent}>
        <Link href='/'>
          <img className={styles.Logo} src={logo.src} alt='logo img' />
        </Link>
        {user.email !== null ? (
          <div className={styles.ProfileContent}>
            <img
              className={styles.ProfileImg}
              src={user.image_source}
              alt='profile img'
            />
            <span>{user.email}</span>
          </div>
        ) : (
          <Link href='/signin' className={styles.LoginBtn}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}
