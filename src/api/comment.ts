import { Comment } from '~/models/Comment.ts';
import { authClient } from './auth/authClient.ts';

//get
// export const getCommentsByBoardId = async (boardId: number) => {
//   try {
//     const response = await client.get<Comment[]>(`/comment/${boardId}`);

//     // createdAt 필드를 Date 객체로 변환
//     const comments: Comment[] = [];
//     response.data.forEach((comment) => {
//       const replies: Comment[] = [];
//       comment.commentList.forEach((reply) => {
//         replies.push({
//           ...reply,
//           createdAt: new Date(reply.createdAt),
//         });
//       });
//       comments.push({
//         ...comment,
//         createdAt: new Date(comment.createdAt),
//         commentList: replies,
//       });
//     });

//     return comments;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getCommentsCountByCategory = async (boardId: number) => {
//   try {
//     const response = await client.get<number>(`/comment/count/${boardId}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//post
export const createComments = async (comment: Comment, boardId: number) => {
  try {
    // 권한이 필요한 작업에 authClient 사용
    const response = await authClient.post<Comment>(
      `/comment/${boardId}`,
      comment,
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//post
export const createChildComments = async (
  comment: Comment,
  boardId: number,
  parentId: number,
) => {
  try {
    // 권한이 필요한 작업에 authClient 사용
    const response = await authClient.post<Comment>(
      `/comment/${boardId}`,
      {
        userId: comment.userId,
        parentCommentId: parentId,
        content: comment.content,
      },
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//put
export const updateComments = async (comment: Comment) => {
  try {
    // 권한이 필요한 작업에 authClient 사용
    const response = await authClient.put<Comment>(
      `/comment/${comment.id}`,
      comment,
      {
        headers: { 'Conetent-type': 'application/json; charset=UTF-8' },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//delete
export const deleteComments = async (id: number) => {
  try {
    // 권한이 필요한 작업에 authClient 사용
    const response = await authClient.delete<Comment>(`/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
