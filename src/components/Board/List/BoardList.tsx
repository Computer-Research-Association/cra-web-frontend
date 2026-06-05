// import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import { CATEGORY } from '~/constants/category.ts';
import { useAllTags } from '~/hooks/useAllTags.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from './BoardList.module.css';

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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useAllTags(category === CATEGORY.ACADEMIC);

  const filteredBoards =
    category === CATEGORY.ACADEMIC && selectedTag
      ? boardsQuery.filter((b) => b.tags?.some((t) => t.name === selectedTag))
      : boardsQuery;

  const renderBoardContent = () => {
    if (filteredBoards.length > 0) {
      const pinnedBoardIdSet = new Set(pinned?.map((board) => board.boardId));
      const pinnedBoards: Board[] = [];
      const normalBoards: Board[] = [];
      for (const board of filteredBoards) {
        (pinnedBoardIdSet.has(board.id) ? pinnedBoards : normalBoards).push(board);
      }
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
      {category === CATEGORY.ACADEMIC && (
        <div className={styles.tagFilterContainer}>
          <button
            className={`${styles.tagFilterButton} ${selectedTag === null ? styles.tagFilterButtonActive : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
              <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
              <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
              <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
              <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
            </svg>
            All
          </button>
          <div className={styles.tagScrollArea}>
            {allTags.map((tag) => (
              <button
                key={tag.id}
                className={`${styles.tagFilterButton} ${selectedTag === tag.name ? styles.tagFilterButtonActive : ''}`}
                onClick={() => setSelectedTag(tag.name)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        {category === CATEGORY.ACADEMIC ? (
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
