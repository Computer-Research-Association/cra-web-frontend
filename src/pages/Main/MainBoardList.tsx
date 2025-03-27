/* eslint-disable */
// @ts-nocheck

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getBoardsByCategory } from '~/api/board.ts';
import { BoardPageList } from '~/models/Board.ts';
import MainBoardItem from './MainBoardItem.tsx';
import LoadingSpinner from '~/components/Common/LoadingSpinner.tsx';
import styles from './MainBoardList.module.css';

export default function MainBoardList({ category }: { category: number }) {
  const navigate = useNavigate();

  const currentPage = 0;
  const boardsQuery = useQuery<BoardPageList>({
    queryKey: QUERY_KEY.board.boards(category, currentPage),
    queryFn: async () => getBoardsByCategory(category, currentPage),
  });

  // 에러 뜨면 에러 페이지로 넘어가게
  useEffect(() => {
    if (boardsQuery.isError) {
      void navigate('/internal-server-error');
    }
  }, [boardsQuery.isError, navigate]);

  let content;

  if (boardsQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (boardsQuery.isSuccess && boardsQuery.data?.resListBoardDtos) {
    content = boardsQuery.data.resListBoardDtos
      .slice(0, 5)
      .map((board, index) => {
        if (board.id === undefined) return null;
        return (
          <div key={`board-${board.id}`}>
            <div className={styles['board-wrapper']}>
              <MainBoardItem board={board} />
            </div>
            {index < boardsQuery.data.resListBoardDtos.length - 6 && (
              <div className={styles['divider']} />
            )}
          </div>
        );
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles['divider']}></div>
      <div className={styles['board-list']}>{content}</div>
      <div className={styles['divider']}></div>
    </div>
  );
}
