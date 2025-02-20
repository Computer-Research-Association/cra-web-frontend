import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // localStorage 또는 sessionStorage에 자동으로 저장 및 복원
import { ReqSignUp, ReissueToken, Login, ResTokenDto } from '~/models/Auth';
// authStore interface의 메소드명과 겹쳐서 이름 변경해주기 ("___Api")
import {
  login as loginApi,
  signUp as signUpApi,
  reissueToken as reissueTokenApi,
  logOut as logOutApi,
} from '~/api/auth/authApi';
import { useUserStore } from '~/store/userStore';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

// Zustand에서 관리할 상태의 구조, 데이터 Type 정의
interface authStore {
  login: (_data: Login) => Promise<void>; // 로그인 요청 처리
  signUp: (_data: ReqSignUp) => Promise<void>; // 새로운 사용자 등록 처리
  reissueToken: (_data: ReissueToken) => Promise<void>; // 저장된 Refresh Token으로 새로운 Access, Refresh Token 받는 요청 처리
  logout: () => Promise<void>; // 로그아웃 처리 (상태 초기화, 토큰 제거)
  userId: number | null; // 현재 로그인된 사용자의 고유 Id 저장 (number 이거나 null)
  accessToken: string | null; // 로그인 성공 시 서버에서 발급한 Access Token 저장
  refreshToken: string | null; // Access Token이 만료되었을때, 새로운 토근을 발급받기 위한 Refresh Token을 저장
  isAuthenticated: boolean; // 현재 로그인 상태인가?
}

// create로 Zustand 상태 정의
export const useAuthStore = create<authStore>()(
  // persist: 상태를 localStorage에 저장하고 브라우저를 새로고침해도 상태가 유지되게 함
  persist(
    // 초기상태 설정
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      userId: null,

      // 로그인 메서드
      login: async (data: Login) => {
        try {
          // 로그인 Api를 호출하여 사용자 인증을 처리하고, 서버로부터 중요한 데이터를 반환
          const response = await loginApi(data);
          console.log('🔍 로그인 API 응답:', response);

          const { resTokenDto, resUserDetailDto } = response;
          console.log(resTokenDto.refreshToken);
          if (!resTokenDto) {
            throw new Error('resTokenDto가 응답에 없음');
          }

          set({
            isAuthenticated: true, // 로그인 성공 시 true로 변경하여 인증 상태를 갱신
            accessToken: resTokenDto.accessToken,
            refreshToken: resTokenDto.refreshToken,
            userId: resTokenDto.userId,
          });
          console.log('첫번째 엑세스 토큰: ', resTokenDto.accessToken);
          console.log('첫번째 리프레시 토큰: ', resTokenDto.refreshToken);

          // Session Storage에도 토큰을 저장하여 다른 Api 요청에서도 사용할 수 있게하기
          sessionStorage.setItem('refreshToken', resTokenDto.refreshToken);

          await useAuthStore.getState().reissueToken({
            userId: resTokenDto.userId,
            refreshToken: resTokenDto.refreshToken,
          });

          useUserStore.getState().setUser({
            name: resUserDetailDto.name,
            email: resUserDetailDto.email,
            studentId: resUserDetailDto.studentId,
            term: resUserDetailDto.term,
            githubId: resUserDetailDto.githubId,
            imgUrl: resUserDetailDto.imgUrl
              ? resUserDetailDto.imgUrl
              : DEFAULT_PROFILE,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
          });
          useUserStore.getState().resetUser();
          sessionStorage.clear();
          console.error('Error During Login: ', error);
          throw error;
        }
      },

      // 회원가입 메서드
      signUp: async (data: ReqSignUp) => {
        try {
          // 새로운 사용자를 등록만 하기 때문에, 성공 or 실패 여부만 반환 (다른 반환값 굳이 처리할 필요 X And 별도의 상태 업데이트 필요 X)
          await signUpApi(data);
        } catch (error) {
          console.error('Error during SignUp: ', error);
          throw error;
        }
      },

      // 토큰 재발급 메서드
      reissueToken: async (data: ReissueToken) => {
        try {
          console.log('리이슈 토큰 파라미터', data);
          // 토근 재발급 Api를 호출하여 새로운 ResponseToken(accessToken, refreshToken, userId)을 받음
          console.log(data);
          const response: ResTokenDto = await reissueTokenApi(data);
          const newRefreshToken = sessionStorage.getItem(
            'refreshToken',
          ) as string;
          console.log('세션에서 불러온 리프레시 토큰:', newRefreshToken);
          set({
            accessToken: response.accessToken,
            refreshToken: newRefreshToken,
            userId: response.userId,
          });

          // Session Storage를 갱신해서 최신 인증 정보 유지
          sessionStorage.setItem('accessToken', response.accessToken);
          sessionStorage.setItem('refreshToken', newRefreshToken);
        } catch (error) {
          useUserStore.getState().resetUser();
          sessionStorage.clear();
          throw error;
        }
      },

      // 로그아웃 메서드
      logout: async () => {
        try {
          await logOutApi();
        } catch (error) {
          console.error('Logout Error:', error);
          throw error;
        } finally {
          set({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            userId: null,
          });
          useUserStore.getState().resetUser();
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('userId');
        }
      },
    }),

    // persist옵션에서 name을 지정하여 localStorage에 저장되는 key 이름을 지정
    {
      name: 'auth-storage',
      storage: {
        getItem: <T>(name: string): T | null => {
          const str = sessionStorage.getItem(name);
          return str ? (JSON.parse(str) as T) : null;
        },
        setItem: (name: string, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => sessionStorage.removeItem(name),
      },
    },
  ),
);
