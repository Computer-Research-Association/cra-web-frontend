// import { UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from './BoardList.module.css';
import { useState } from 'react';
import ListSearch from './ListSearch';
// import LoadingSpinner from '~/components/Common/LoadingSpinner';

interface BoardListProps {
  category: number;
  boardsQuery: Board[];
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
  const [searchTerm, setSearchTerm] = useState('');
  const filteredBoards = boardsQuery
    ?.filter((board) => board.id !== undefined) // ID가 존재하는 게시글만 유지
    .filter((board) =>
      board.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const renderBoardContent = () => {
    if (filteredBoards.length > 0) {
      return filteredBoards.map((board, index) => (
        <div key={`board-${board.id}`}>
          <div className={styles['board-wrapper']}>
            <BoardItem board={board} category={category} />
          </div>
          {index < boardsQuery.length - 1 && (
            <div className={styles.divider}></div>
          )}
        </div>
      ));
    } else {
      return <p>검색 결과가 없습니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <ListSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
