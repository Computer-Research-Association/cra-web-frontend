import { Board } from '~/models/Board.ts';
import { client } from './client.ts';
import { authClient } from './auth/authClient.ts';
import { UpdateBoard } from '~/models/Board.ts';

// [GET]
export const getBoardCountByCategory = async (category: number) => {
  try {
    const response = await client.get<Board[]>(`/board/${category}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// [GET] by Pagination
export const getBoardsByCategory = async (
  category: number,
  page: number = 1,
  perPage: number = 10,
  orderBy: number = 0,
) => {
  try {
    const response = await client.get<Board[]>(
      `/board/${category}/page/${page}`,
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
    console.log(error);
    throw error;
  }
};

// id로 게시물 가져오기 (Detail 페이지에 사용)
export const getBoardById = async (id: number) => {
  try {
    const response = await authClient.get<Board>(`/board/view/${id}`);
    const board = response.data;

    return {
      ...board,
      createdAt: board.createdAt ? new Date(board.createdAt) : new Date(), // createAt을 Date 객체로 변환
    };
  } catch (error) {
    console.log('⚠️ Error occurred while fetching board:', error);
    // 원본 error를 그대로 throw
    throw error;
  }
};

// [POST]
// 새로운 게시판(Board)을 생성하기 위해 서버에 POST 요청을 보내는 메소드
// parameter로 Board 타입의 객체를 받아서 서버로 전송
export const createBoards = async (board: Board, file: File | null) => {
  try {
    const formData = new FormData();

    formData.append(
      'board',
      new Blob([JSON.stringify(board)], { type: 'application/json' }),
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
    console.log(error);
    throw error;
  }
};

// PUT
export const updateBoards = async (board: UpdateBoard, file: File | null) => {
  try {
    const formData = new FormData();

    const boardData = {
      title: board.title,
      content: board.content,
      imageUrls: board.imageUrls,
      isChangedFile: !!file,
      deleted: false,
    };

    formData.append(
      'board',
      new Blob([JSON.stringify(boardData)], { type: 'application/json' }),
    );

    if (file) {
      formData.append('file', file);
    }

    const currentUrl = window.location.href;
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const boardId = Number(id);

    const response = await authClient.put<FormData>(
      `/board/${boardId}`,
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Update board error:', error);
    throw error;
  }
};
// DELETE

export const deleteBoards = async (id: number): Promise<Board> => {
  try {
    // 권한이 필요한 작업에 authClient 사용
    const response = await authClient.delete<Board>(`/board/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const onUploadImage = async (blob: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', blob);

  try {
    const response = await authClient.post<string>('/image/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const imageUrl = response.data;

    console.log('받은 이미지 URL:', imageUrl);

    return imageUrl; // 이미지 URL만 반환 (callback 없음)
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
