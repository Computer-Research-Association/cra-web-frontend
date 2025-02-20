import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { reissueToken } from './authApi.ts';
import { useAuthStore } from '~/store/authStore';

// axios 인터셉터를 사용하여 api 요청 시 토큰을 자동으로 갱신하는 기능
export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string, // 기본 API 엔드포인트
  timeout: 5000, // 요청 타임아웃
});

authClient.interceptors.request.use(
  async (config) => {
    // 토큰들을 sessionStorage에서 가져오기
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const userId = useAuthStore.getState().userId as number; // 상태에서 userId 가져오기

    if (accessToken && refreshToken) {
      // exp는 JWT의 만료시간 (초 단위)를 나타냄
      const decoded: { exp: number } = jwtDecode(accessToken);
      // 밀리초 단위로 시간을 반환하는 Data.now()와 비교하기 위해 * 1000 을 해서 비교
      const isTokenExpired = decoded.exp * 1000 < Date.now();
      // isTokenExpired 이 True면 토큰이 만료된거고 False면 아직 유효함
      if (isTokenExpired) {
        try {
          // 토큰 만료 시 refreshToken을 사용하여 새로운 accessToken을 발급
          const { accessToken: newAccessToken } = await reissueToken({
            userId,
            refreshToken,
          });
          // 새로운 accessToken을 세션에 저장
          sessionStorage.setItem('accessToken', newAccessToken);
          // 서버에서 토큰 검증을 위해 헤더에 newAccessToken을 Bearer Token으로 보내어 검증

          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          // refreshToken 재발급 실패 시 로그아웃 처리 해버리기
          sessionStorage.clear();
          console.error('Session Error:', error);
          throw new Error('Session expired, please log in again');
        }
      } else {
        // accessToken이 유효하다면 (만료 X) 그대로 사용하기
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(`Request error: ${error}`));
  },
);
