import axios from 'axios';
import { Board, BoardPageList } from '~/models/Board';
import { authClient } from '~/api/auth/authClient.ts';

// 페이지네이션 적용된 하브루타 게시물 모두 가져오기
export const getHavrutaBoards = async (
  page: number = 1,
  perPage: number = 10,
  orderBy: number = 0,
) => {
  try {
    const response = await authClient.get<BoardPageList>(
      `/board/havruta/page/${page}`,
      {
        params: {
          perPage,
          orderBy,
          isASC: false,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 과목별 하브루타 게시물 모두 가져오기
export const getHavrutaBoardsByHavrutaId = async (
  havrutaId: number,
  page: number = 1,
  perPage: number = 10,
  orderBy: number = 0,
) => {
  try {
    const response = await authClient.get<BoardPageList>(
      `/board/havruta/${havrutaId}/page/${page}`,
      {
        params: {
          perPage,
          orderBy,
          isASC: false,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 하브루타 게시물 상세보기
export const getHavrutaBoardById = async (id: number) => {
  try {
    const response = await authClient.get<Board>(`/board/view/${id}`);
    const havruta = response.data;

    return {
      ...havruta,
      createdAt: havruta.createdAt ? new Date(havruta.createdAt) : new Date(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createHavrutaBoard = async (
  havrutaBoard: Board,
  file: File | null,
) => {
  try {
    const formData = new FormData();

    formData.append(
      'board',
      new Blob([JSON.stringify(havrutaBoard)], { type: 'application/json' }),
    );

    if (file) {
      formData.append('file', file);
    }

    const response = await authClient.post<FormData>('/board', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateHavrutaBoard = async (havrutaBoard: Board) => {
  try {
    const formData = new FormData();

    formData.append(
      'board',
      new Blob([JSON.stringify(havrutaBoard)], { type: 'application/json' }),
    );

    const response = await authClient.put<FormData>(
      `/board/${havrutaBoard.id}`,
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post data:', error);

    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// 하브루타 게시물 삭제하기
export const deleteHavrutaBoards = async (id: number): Promise<Board> => {
  try {
    const response = await authClient.delete<Board>(`/board/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
