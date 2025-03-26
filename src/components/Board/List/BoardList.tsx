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
  // const [searchTerm, setSearchTerm] = useState(() => {
  //   const savedSearchTerm = sessionStorage.getItem('searchTerm');
  //   return savedSearchTerm || '';
  // });

  // searchTerm이 변경될 때마다 sessionStorage에 값을 저장
  // useEffect(() => {
  //   sessionStorage.setItem('searchTerm', searchTerm);
  // }, [searchTerm]);
  // const [filteredBoards, setFilteredBoards] = useState<Board[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [totalPagesFromServer, setTotalPagesFromServer] = useState(totalPages);
  // const [isSearching, setIsSearching] = useState(false);

  const { data: pinBoards } = useQuery<Board[]>({
    queryKey: ['pinBoards'],
    queryFn: getPinBoard,
  });

  // useEffect(() => {
  //   if (searchTerm.trim() === '') {
  //     setFilteredBoards(boardsQuery);
  //     setIsSearching(false);
  //   } else {
  //     setIsSearching(true);
  //   }
  // }, [searchTerm, boardsQuery]);

  //----------------------------나중에 뭔가 깔끔하게 하기기----------------------------------------
  // const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     setLoading(true);
  //     onPageChange(0);
  //     try {
  //       const result: BoardPageList = await searchBoard(
  //         currentPage,
  //         searchTerm,
  //         category,
  //       );
  //       // const filterCategory = result.resListBoardDtos?.[0]?.category;

  //       if (searchTerm.trim() === '') {
  //         setFilteredBoards(boardsQuery); // 검색어 없으면 전체 게시물
  //       } else {
  //         const filteredBoards = result.resListBoardDtos?.filter(
  //           (board) =>
  //             board.title.toLowerCase().includes(searchTerm) ||
  //             board.content.toLowerCase().includes(searchTerm),
  //         );

  //         setTotalPagesFromServer(result.totalPages as number); // 서버에서 받아온 totalPages 설정
  //         setFilteredBoards(filteredBoards ?? []); // 필터링된 게시물
  //       }
  //     } catch (error) {
  //       console.error('검색 중 오류 발생:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  //---------------------------------------------------------------------------------
  // useEffect(() => {
  //   if (searchTerm.trim() !== '') {
  //     setLoading(true);
  //     const fetchSearchResults = async () => {
  //       try {
  //         const result: BoardPageList = await searchBoard(
  //           currentPage,
  //           searchTerm,
  //           category,
  //         ); // 현재 페이지로 검색
  //         const filteredBoards = result.resListBoardDtos?.filter(
  //           (board) =>
  //             board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //             board.content.toLowerCase().includes(searchTerm.toLowerCase()),
  //         );
  //         setTotalPagesFromServer(result.totalPages as number);
  //         setFilteredBoards(filteredBoards ?? []);
  //       } catch (error) {
  //         console.error('검색 중 오류 발생:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     void fetchSearchResults();
  //   } else {
  //     setFilteredBoards(boardsQuery); // 검색어가 없으면 전체 게시물 표시
  //   }
  // }, [currentPage, category]); // 페이지 변경 시에도 검색어를 기반으로 결과를 갱신

  // //---------------------------------------------------------------------------------
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
          <div className={styles['no-result']}>검색 결과가 없습니다.</div>
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
