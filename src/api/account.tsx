import { client } from './client';
import { AxiosResponse } from 'axios';

interface FindUsernameParams {
  studentId: string;
  name: string;
  email: string;
}
interface ChangePasswordParams {
  code: string;
  password: string;
}
// email 인증 요청
export const emailRequest = async (email: string): Promise<number> => {
  const response = await client.post<void>(
    `/account/valid/email-request?email=${email}`,
  );
  return response.status;
};

// email 인증
export const emailCode = async (emailCode: string): Promise<number> => {
  const response = await client.post<void>(
    `/account/valid/email-code?code=${emailCode}`,
  );
  return response.status;
};

// PW 재설정
export const changePassword = async ({
  code,
  password,
}: ChangePasswordParams): Promise<number> => {
  const response = await client.put<void>('/user/password-change', {
    code,
    password,
  });
  return response.status;
};

// PW 재설정 인증 요청
export const pwEmailRequest = async (username: string): Promise<number> => {
  const response = await client.post<void>(
    `/account/password-change?username=${username}`,
  );
  return response.status;
};

// ID 찾기 요청
export const findId = async (params: FindUsernameParams): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await client({
      method: 'get',
      url: '/account/find/username',
      params: {
        name: params.name,
        email: params.email,
        studentId: params.studentId,
      },
    });

    console.log('Full API Response:', response);

    if (!response.data) {
      throw new Error('응답에서 username을 찾을 수 없습니다.');
    }

    return response.data; // username이 아니라 data 자체를 반환!
  } catch (error) {
    console.error('Find ID API Error:', error);
    throw error;
  }
};
