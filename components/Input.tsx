import React from 'react';
import styles from '@/styles/Input.module.css';

export default function Input({
  id = '',
  className = '',
  placeholder = '',
  type = '',
  emailError = '',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) {
  const inputClassName = emailError
    ? `${styles[className]} ${styles.InputError}`
    : `${styles[className]}`;

  return (
    <input
      id={id}
      className={inputClassName}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
