// 이메일 형식 확인하는 정규식
export const emailRegex =
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// 비밀번호 형식 확인하는 정규식
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
