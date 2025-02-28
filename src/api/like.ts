import { Board } from '~/models/Board';
import { authClient } from './auth/authClient';

export const createLike = async (id: number, isLike: boolean) => {
  try {
    const response = await authClient.post<Board>(`/board/like/${id}`, null, {
      params: { isLike }, // params는 객체여야 함
    });

    return response.data;
  } catch (error) {
    console.error('좋아요 요청 실패:', error);
    throw error;
  }
};

export default createLike;
