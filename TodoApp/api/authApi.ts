import axiosInstance from './axiosInstance';

export const signup = async (username: string, password: string) => {
  console.log('[회원가입 요청]', { username, password });

  try {
    const res = await axiosInstance.post('/auth/signup', { username, password });
    console.log('[회원가입 성공]', res.data);
    return res.data;
  } catch (err) {
    console.error('[회원가입 실패]', err);
    throw err;
  }
};

export const login = async (username: string, password: string) => {
  try {
    console.log('[로그인 요청]', { username, password });
    const res = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    console.log('[로그인 성공]', res.data);
    return res.data;
  } catch (error) {
    console.error('[로그인 실패]', error);
    throw error;
  }
};
