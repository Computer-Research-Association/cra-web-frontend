// import { UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Board, BoardPageList } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from './BoardList.module.css';
import React, { useEffect, useState } from 'react';
import ListSearch from './ListSearch';
import { searchBoard } from '~/api/search';
import LoadingSpinner from '~/components/Common/LoadingSpinner';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoards, setFilteredBoards] = useState<Board[]>([]); // Board[] 타입으로 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(false);
  const [totalPagesFromServer, setTotalPagesFromServer] = useState(totalPages); // 서버에서 받은 totalPages 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 중인지 여부를 판단하는 상태

  const { data: pinBoards } = useQuery<Board[]>({
    queryKey: ['pinBoards'],
    queryFn: getPinBoard,
  });

  // "Enter" 키를 눌렀을 때만 검색 실행
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // 검색어가 비어있으면 전체 게시물을 설정
      setFilteredBoards(boardsQuery);
      setIsSearching(false); // 검색 중이 아님
    } else {
      setIsSearching(true); // 검색 중
    }
  }, [searchTerm, boardsQuery]);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoading(true);
      onPageChange(0);
      try {
        const result: BoardPageList = await searchBoard(
          0,
          searchTerm,
          category,
        );

        if (searchTerm.trim() === '') {
          setFilteredBoards(boardsQuery); // 검색어 없으면 전체 게시물
        } else {
          const filteredBoards = result.resListBoardDtos?.filter(
            (board) =>
              board.title.toLowerCase().includes(searchTerm) ||
              board.content.toLowerCase().includes(searchTerm),
          );
          setTotalPagesFromServer(result.totalPages as number); // 서버에서 받아온 totalPages 설정

          setFilteredBoards(filteredBoards ?? []); // 필터링된 게시물
        }
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderBoardContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    if (filteredBoards.length > 0) {
      const pinnedBoardIds = pinBoards
        ? pinBoards.map((board) => board.boardId)
        : [];

      // 필터링된 게시물에서 핀된 게시물과 일반 게시물 분리
      const pinnedBoards = filteredBoards.filter((board) =>
        pinnedBoardIds.includes(board.id),
      );

      const normalBoards = filteredBoards.filter(
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
      return <p>검색 결과가 없습니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{CATEGORY_STRINGS[category]} 게시판</h2>
      <ListSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onKeyDown={handleSearch}
      />
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']} />
        <Pagination
          totalPages={isSearching ? totalPagesFromServer : totalPages}
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
