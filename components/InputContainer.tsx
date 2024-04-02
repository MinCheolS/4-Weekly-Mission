import React from 'react';
import Input from './Input';
import styles from '@/styles/InputContainer.module.css';
import passwordToggle from '@/public/passwordOff.svg';

export default function InputContainer() {
  return (
    <div className={styles.SignInputContent}>
      <label htmlFor='password'>비밀번호</label>
      <div className={styles.SignPasswordContent}>
        {/* <Input
          className='EmailInput'
          placeholder='codeit@codeit.com'
          type='text'
        />
        <br />
        <br /> */}
        <Input
          className='PasswordInput'
          placeholder='‧ ‧ ‧ ‧ ‧ ‧ ‧ ‧'
          type='password'
        />
        <img className={styles.PasswordOnOffToggle} src={passwordToggle.src} />
      </div>
      {/* {passwordError && (
        <span className='ErrorPasswordMessage'>{passwordError}</span>
      )} */}
    </div>
  );
}