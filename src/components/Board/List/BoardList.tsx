// import { UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from './BoardList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getPinBoard } from '~/api/pin';

// import LoadingSpinner from '~/components/Common/LoadingSpinner';

interface BoardListProps {
  category: number;
  boardsQuery: Board[];
  pinned: Board[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

export default function BoardList({
  category,
  boardsQuery,
  pinned,
  totalPages,
  currentPage,
  onPageChange,
}: BoardListProps) {
  const { data: pinBoards } = useQuery<Board[]>({
    queryKey: ['pinBoards'],
    queryFn: getPinBoard,
  });

  const renderBoardContent = () => {
    if (boardsQuery.length > 0) {
      const pinnedBoardIds = pinBoards
        ? pinBoards.map((board) => board.boardId)
        : [];

      // 필터링된 게시물에서 핀된 게시물과 일반 게시물 분리
      const pinnedBoards = boardsQuery.filter((board) =>
        pinnedBoardIds.includes(board.id),
      );

      const normalBoards = boardsQuery.filter(
        (board) => !pinnedBoardIds.includes(board.id),
      );

      const combinedBoards = [...pinnedBoards, ...normalBoards];

      return combinedBoards.map((board, index) => (
        <div key={`board-${board.id}`}>
          <div className={styles['board-wrapper']}>
            <BoardItem board={board} category={category} pinned={pinned} />
          </div>
          {index < combinedBoards.length - 1 && (
            <div className={styles.divider}></div>
          )}
        </div>
      ));
    } else {
      return (
        <div>
          <div className={styles['no-result']}>게시물이 존재하지 않습니다.</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{CATEGORY_STRINGS[category]} 게시판</h2>
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        {CATEGORY_STRINGS[category] === '학술' ? (
          <Link
            className={styles.WriteLink}
            to={`/${CATEGORY_STRINGS_EN[category]}/write`}
          >
            글쓰기
          </Link>
        ) : (
          <div className={styles['spacer']} />
        )}
      </div>
    </div>
  );
}
