import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { reissueToken } from './authApi.ts';
import { useAuthStore } from '~/store/authStore.ts';

// axios 인터셉터를 사용하여 api 요청 시 토큰을 자동으로 갱신하는 기능
export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string, // 기본 API 엔드포인트
  timeout: 5000, // 요청 타임아웃
});

authClient.interceptors.request.use(
  async (config) => {
    // 토큰들을 sessionStorage & localStorage에서 가져오기
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = useAuthStore.getState().userId as number;

    if (accessToken && refreshToken) {
      try {
        // exp는 JWT의 만료시간 (초 단위)를 나타냄
        const decoded: { exp: number } = jwtDecode(accessToken);

        // 밀리초 단위로 시간을 반환하는 Date.now()와 비교하기 위해 * 1000 을 해서 비교
        const isTokenExpired = decoded.exp * 1000 < Date.now();

        if (isTokenExpired) {
          // 토큰 만료 시 refreshToken을 사용하여 새로운 accessToken을 발급
          const { accessToken: newAccessToken } = await reissueToken({
            refreshToken,
            userId,
          });

          // 새로운 accessToken을 세션에 저장
          sessionStorage.setItem('accessToken', newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        localStorage.clear();
        console.error('Session Error:', error);
        throw new Error('Session expired, please log in again');
      }
    }

    return config;
  },
  (error) => Promise.reject(new Error(`Request error: ${error}`)),
);

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = useAuthStore.getState().userId as number;

        if (refreshToken) {
          // 401 발생 시 refreshToken으로 새로운 accessToken 발급
          const { accessToken: newAccessToken } = await reissueToken({
            userId,
            refreshToken,
          });

          sessionStorage.setItem('accessToken', newAccessToken);

          // 실패했던 요청을 새로운 토큰으로 재시도
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return authClient.request(error.config);
        }
      } catch (reissueError) {
        localStorage.clear();
        console.error('Token reissue failed:', reissueError);
        throw new Error('Session expired, please log in again');
      }
    }

    return Promise.reject(new Error(error));
  },
);
