import { Board } from '~/models/Board';
import { authClient } from './auth/authClient';

export const createPinBoard = async (boardId: number, category: number) => {
  try {
    const response = await authClient.post<Board>(
      '/admin/board/pin',
      { boardId, category },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('게시글 고정 실패:', error);
    throw error;
  }
};

export const getPinBoard = async (): Promise<Board[]> => {
  try {
    const response = await authClient.get<Board[]>('/admin/board/pin');
    return response.data || []; // undefined일 경우 빈 배열을 반환
  } catch (error) {
    console.error('error', error);
    return []; // 오류 발생 시 빈 배열을 반환
  }
};

export const deletePinBoard = async (pinId: number): Promise<Board> => {
  try {
    const response = await authClient.delete<Board>(
      `/admin/board/pin/${pinId}`,
    );
    return response.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};
