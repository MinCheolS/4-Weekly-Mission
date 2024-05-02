const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

export const getSamepleUserInfo = async () => {
  const response = await fetch(`${BASE_URL}/sample/folder`);
  const result = response.json();
  return result;
};

export const getUserInfo = async () => {
  const response = await fetch(`${BASE_URL}/users/1`);
  const result = response.json();
  return result;
};

export const getFolderInfo = async () => {
  const response = await fetch(`${BASE_URL}/users/1/folders`);
  const result = response.json();
  return result;
};

export const getLinksInfo = async () => {
  const response = await fetch(`${BASE_URL}/users/1/links`);
  const result = response.json();
  return result;
};

export const getSelectLinksInfo = async (folderId: number) => {
  const response = await fetch(
    `${BASE_URL}/users/1/links?folderId=${folderId}`
  );
  const result = response.json();
  return result;
};

export const signInUser = async (email: string, password: string) => {
  const userInfo = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch('https://bootcamp-api.codeit.kr/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (response.status === 200) {
      const result = await response.json();
      localStorage.setItem('accessToken', result.data.accessToken);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
