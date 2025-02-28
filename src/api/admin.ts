import { authClient } from './auth/authClient';

export interface SignUpCode {
  code?: string;
  manageTokenCategory?: string;
  createdAt?: Date;
}

// 가입 코드 생성
export const getSignUpCodes = async (length: number): Promise<SignUpCode[]> => {
  try {
    const response = await authClient.get<SignUpCode[]>(
      '/admin/account/code/signup',
      {
        params: { length },
      },
    );
    return response.data;
  } catch (error) {
    console.log('가입 코드 가져오기 에러:', error);
    throw error;
  }
};
