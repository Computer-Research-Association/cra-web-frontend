import { Board } from '~/models/Board';
import { authClient } from './auth/authClient';

// POST/View
export const createBoardsView = async (id: number): Promise<Board> => {
  try {
    const response = await authClient.post<Board>(`/board/view/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
