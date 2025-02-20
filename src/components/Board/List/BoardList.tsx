import { UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from './BoardList.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

interface BoardListProps {
  category: number;
  boardsQuery: UseQueryResult<Board[], unknown>;
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

export default function BoardList({
  category,
  boardsQuery,
  totalPages,
  currentPage,
  onPageChange,
}: BoardListProps) {
  const renderBoardContent = () => {
    if (boardsQuery.isLoading) return <LoadingSpinner />;

    if (totalPages === 0)
      return <div className={styles.noBoards}>현재 게시물이 없습니다.</div>;

    if (boardsQuery.isError)
      return <div className={styles.error}>에러가 발생했습니다!</div>;

    if (boardsQuery.isSuccess) {
      return boardsQuery.data
        .filter((board) => board.id !== undefined)
        .map((board, index) => (
          <div key={`board-${board.id}`}>
            <div className={styles['board-wrapper']}>
              <BoardItem board={board} category={category} />
            </div>
            {index < boardsQuery.data.length - 1 && (
              <div className={styles.divider}></div>
            )}
          </div>
        ));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{CATEGORY_STRINGS[category]} 게시판</h2>
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']}></div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <Link
          className={styles.WriteLink}
          to={`/${CATEGORY_STRINGS_EN[category]}/write`}
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
