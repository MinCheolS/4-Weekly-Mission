import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Signup.module.css';
import logo from '@/public/logo.svg';
import kakao from '@/public/kakao logo.svg';
import google from '@/public/google.svg';
import passwordOff from '@/public/passwordOff.svg';
import passwordOn from '@/public/passwordOn.svg';
import { emailRegex, passwordRegex } from '@/components/Regex';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [passwordValue, setPasswordValue] = useState(false);
  const [passwordCheckValue, setPasswordCheckValue] = useState(false);

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

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const handlePasswordCheckFoucs = () => {
    setPasswordCheckError('');
  };

  const handlePasswordCheckBlur = () => {
    if (passwordCheck === '') {
      setPasswordCheckError('비밀번호를 입력해 주세요.');
      return;
    }
    if (password !== passwordCheck) {
      setPasswordCheckError('비밀번호가 일치하지 않아요.');
    }
  };

  const isPasswordCheckValueChange = () => {
    setPasswordCheckValue(!passwordCheckValue);
  };

  return (
    <div className={styles.SignupContainer}>
      <div className={styles.LogoContent}>
        <Link href='/' className={styles.LogoLink}>
          <img src={logo.src} alt='logo img' />
        </Link>
        <p className={styles.LogoMessage}>
          이미 회원이신가요?
          <Link href='/signin' className={styles.LogoMessageLink}>
            로그인 하기
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
                  placeholder='영문, 숫자를 조합해 8자 이상 입력해 주세요.'
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
            <div className={styles.SignInputContent}>
              <label htmlFor='password-check'>비밀번호 확인</label>
              <div className={styles.SignPasswordContent}>
                <input
                  id='password-check'
                  className={`${styles.PasswordCheckInput} ${
                    passwordCheckError && `${styles.InputError}`
                  }`}
                  type='password'
                  placeholder='비밀번호와 일치하는 값을 입력해 주세요.'
                  onChange={handlePasswordCheckChange}
                  onBlur={handlePasswordCheckBlur}
                  onFocus={handlePasswordCheckFoucs}
                />
                <img
                  src={passwordCheckValue ? passwordOn.src : passwordOff.src}
                  className={
                    passwordCheckValue
                      ? styles.PasswordOffToggleCheck
                      : styles.PasswordOnToggleCheck
                  }
                  onClick={isPasswordCheckValueChange}
                  alt={passwordCheckValue ? `passwordOff` : `passwordOn`}
                />
              </div>
              {passwordCheckError && (
                <span className={styles.ErrorPasswordCheckMessage}>
                  {passwordCheckError}
                </span>
              )}
            </div>
          </div>
          <button className={styles.SignBtn} type='submit'>
            회원가입
          </button>
        </form>
        <div className={styles.SnsContent}>
          <span className={styles.SnsText}>다른 방식으로 가입하기</span>
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
