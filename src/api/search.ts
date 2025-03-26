import { BoardPageList } from '~/models/Board';
import { authClient } from './auth/authClient';

export const searchBoard = async (
  page: number,
  keyword: string,
  category: number,
  perPage: number = 10,
  orderBy: number = 0,
  isASC: boolean = true,
) => {
  try {
    const response = await authClient.get<BoardPageList>(`/board/search`, {
      params: { page, keyword, category, perPage, orderBy, isASC },
    });
    return response.data;
  } catch (error) {
    console.error('검색 요청 실패:', error);
    throw error;
  }
};
