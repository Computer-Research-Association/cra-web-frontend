/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChildComments, createComments } from '~/api/comment.ts';
import { Comment } from '~/models/Comment.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import styles from './CommentWrite.module.css';

export default function CommentWrite({
  parentId,
}: {
  parentId: number | undefined;
}) {
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); // URL 파라미터에서 id 가져오기
  const boardId = Number(id); // id를 숫자로 변환
  const [formData, setFormData] = useState({
    boardId: boardId,
    content: '',
  });
  const queryClient = useQueryClient();

  const mutationFn = !parentId
    ? (newComment: Comment) => createComments(newComment, boardId)
    : (newComment: Comment) =>
        createChildComments(newComment, boardId, parentId);

  const handleSuccess = async () => {
    try {
      // 폼 데이터 초기화
      setFormData({
        boardId: boardId,
        content: '',
      });

      const queryKeys = [
        QUERY_KEY.comment.commentsById(boardId),
        QUERY_KEY.comment.commentsCountById(boardId),
      ];

      // invalidate 및 refetch 병렬 처리
      await Promise.all(
        queryKeys.flatMap((key) => [
          queryClient.invalidateQueries({ queryKey: key }),
          queryClient.refetchQueries({ queryKey: key }),
        ]),
      );
    } catch (error) {
      console.error('댓글 갱신 실패:', error);
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      userId: -1,
      commentList: [],
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deleted: false,
      havrutaDto: {
        id: null,
        classname: '',
        professor: '',
      },
      resUserDetailDto: {
        name: '',
        email: '',
        studentId: -1,
        term: '',
        githubId: '',
        imgUrl: '',
      },
    });
  };

  return (
    <div className={styles.commentWriteContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="댓글을 작성하세요"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          댓글쓰기
        </button>
      </form>
    </div>
  );
}
