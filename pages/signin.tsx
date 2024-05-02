import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@styles/Signin.module.css';
import { emailRegex, passwordRegex } from '@components/Regex';
import logo from '@public/logo.svg';
import kakao from '@public/kakao logo.svg';
import google from '@public/google.svg';
import passwordOff from '@public/passwordOff.svg';
import passwordOn from '@public/passwordOn.svg';
import { signInUser } from './api/api';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValue, setPasswordValue] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailFoucs = () => {
    setEmailError('');
  };

  const handleEmailBlur = () => {
    if (email === '') {
      setEmailError('이메일을 입력해 주세요.');
      return;
    }
    if (!email.match(emailRegex)) {
      setEmailError('올바른 이메일 주소가 아닙니다.');
      return;
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordFoucs = () => {
    setPasswordError('');
  };

  const handlePasswordBlur = () => {
    if (password === '') {
      setPasswordError('비밀번호를 입력해 주세요.');
      return;
    }
    if (!password.match(passwordRegex)) {
      setPasswordError('비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.');
    }
  };

  const isPasswordValueChange = () => {
    setPasswordValue(!passwordValue);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const signIn = await signInUser(email, password);

      if (signIn) {
        window.location.assign('folder.html');
      } else {
        setEmailError('이메일을 확인해 주세요.');
        setPasswordError('비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.SigninContainer}>
      <div className={styles.LogoContent}>
        <Link href='/' className={styles.LogoLink}>
          <img src={logo.src} alt='logo img' />
        </Link>
        <p className={styles.LogoMessage}>
          회원이 아니신가요?
          <Link href='/signup' className={styles.LogoMessageLink}>
            회원 가입하기
          </Link>
        </p>
      </div>
      <div className={styles.SignContent}>
        <form className={styles.SignForm}>
          <div className={styles.SignInputs}>
            <div className={styles.SignInputContent}>
              <label htmlFor='email'>이메일</label>
              <input
                id='email'
                className={`${styles.EmailInput} ${
                  emailError && `${styles.InputError}`
                }`}
                type='text'
                placeholder='이메일을 입력해 주세요.'
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                onFocus={handleEmailFoucs}
              />
              {emailError && (
                <span className={styles.ErrorEmailMessage}>{emailError}</span>
              )}
            </div>
            <div className={styles.SignInputContent}>
              <label htmlFor='password'>비밀번호</label>
              <div className={styles.SignPasswordContent}>
                <input
                  id='password'
                  className={`${styles.PasswordInput} ${
                    passwordError && `${styles.InputError}`
                  }`}
                  type={passwordValue ? 'text' : 'password'}
                  placeholder='비밀번호를 입력해 주세요.'
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  onFocus={handlePasswordFoucs}
                />
                <img
                  src={passwordValue ? passwordOn.src : passwordOff.src}
                  className={
                    passwordValue
                      ? styles.PasswordOffToggle
                      : styles.PasswordOnToggle
                  }
                  onClick={isPasswordValueChange}
                  alt={passwordValue ? `passwordOff` : `passwordOn`}
                />
              </div>
              {passwordError && (
                <span className={styles.ErrorPasswordMessage}>
                  {passwordError}
                </span>
              )}
            </div>
          </div>
          <button
            className={styles.SignBtn}
            onSubmit={handleSubmit}
            type='submit'
          >
            로그인
          </button>
        </form>
        <div className={styles.SnsContent}>
          <span className={styles.SnsText}>소셜 로그인</span>
          <div className={styles.SnsLinks}>
            <Link href='https://www.google.com/' className={styles.SnsLink}>
              <img src={google.src} alt='google img' />
            </Link>
            <Link
              href='https://www.kakaocorp.com/page/'
              className={styles.SnsLink}
            >
              <img src={kakao.src} alt='kakao img' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
