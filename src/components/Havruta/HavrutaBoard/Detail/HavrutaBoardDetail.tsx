import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getBoardById } from '~/api/board.ts';
// import { getCommentsCountByCategory } from '~/api/comment.ts';
import { Board } from '~/models/Board.ts';
import { CATEGORY } from '~/constants/category.ts';
import HavrutaBoardDetailItem from './Item/HavrutaBoardDetailIItem.tsx';
import styles from './HavrutaBoardDetail.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner.tsx';

export default function HavrutaBoardDetail() {
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const boardId = Number(id);
  const havrutaCategory = CATEGORY.HAVRUTA;

  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const boardQuery = useQuery<Board>({
    queryKey: QUERY_KEY.board.boardById(boardId),
    queryFn: async () => getBoardById(boardId),
    retry: false,
  });

  // const commentCountQuery = useQuery<number>({
  //   queryKey: QUERY_KEY.comment.commentsCountById(boardId),
  //   queryFn: async () => getCommentsCountByCategory(boardId),
  //   retry: false,
  // });

  useEffect(() => {
    if (hasNavigated.current) return;

    if (boardQuery.isError) {
      const error = boardQuery.error;

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status == 404) {
          hasNavigated.current = true;
          void navigate('/not-found');
          return;
        }

        if (status == 403) {
          hasNavigated.current = true;
          void navigate('/forbidden');
          return;
        }

        if (status == 500) {
          hasNavigated.current = true;
          void navigate('/internal-server-error');
          return;
        }
      }

      hasNavigated.current = true;
      void navigate('/internal-server-error', {
        state: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      return;
    }
  });

  if (boardQuery.isFetching) {
    return <LoadingSpinner />;
  }

  if (boardQuery.isSuccess) {
    return (
      <div className={styles['full-width']}>
        <HavrutaBoardDetailItem
          board={boardQuery.data}
          category={havrutaCategory}
        />
      </div>
    );
  }

  return <div>데이터를 불러올 수 없습니다.</div>;
}
