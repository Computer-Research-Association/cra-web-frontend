import { User, UserPassWord } from '~/models/User';
import { authClient } from './auth/authClient';

// 유저 정보 수정
export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await authClient.put<User>(`/user/info`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 유저 삭제
export const deleteUser = async () => {
  try {
    await authClient.delete(`/user`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 유저 비밀번호 변경
export const changeUserPassword = async (): Promise<UserPassWord> => {
  try {
    const response = await authClient.put<UserPassWord>(
      `/user/password-change`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 유저 프사 변경
export const changeUserProfileImage = async (
  imgUrl: string,
): Promise<string> => {
  try {
    const response = await authClient.put<string>(
      `/user/image?imgUrl=${encodeURIComponent(imgUrl)}`,
    );
    return response.data;
  } catch (error) {
    console.error('프로필 이미지 변경 실패:', error);
    throw error;
  }
};

// 유저 프사 최종 업로드
export const uploadProfileImage = async (blob: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', blob);

  try {
    const response = await authClient.post<string>('/image/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const imageUrl = response.data;
    return imageUrl;
  } catch (error) {
    alert('이미지 업로드 실패');
    throw error;
  }
};
