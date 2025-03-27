// import { UseQueryResult } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Board, BoardPageList } from '~/models/Board.ts';
import BoardItem from '~/components/Board/Item/BoardItem.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import styles from '~/components/Board/List/BoardList.module.css';
import { useEffect, useState } from 'react';
import { searchBoard } from '~/api/search';
import LoadingSpinner from '~/components/Common/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { getPinBoard } from '~/api/pin';

// import LoadingSpinner from '~/components/Common/LoadingSpinner';

interface SearchListProps {
  category: number;
  boardsQuery: Board[];
  pinned: Board[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

export default function SearchList({
  category,
  pinned,
  totalPages,
  currentPage,
  onPageChange,
}: SearchListProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('term') || '';
  const [filteredBoards, setFilteredBoards] = useState<Board[]>([]);
  const [totalPagesFromServer, setTotalPagesFromServer] = useState(totalPages);
  const [loading, setLoading] = useState(false);
  const { data: pinBoards } = useQuery<Board[]>({
    queryKey: ['pinBoards'],
    queryFn: getPinBoard,
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      void handleSearch();
    } else {
      setFilteredBoards([]);
      setTotalPagesFromServer(0);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    setLoading(true);
    onPageChange(0);
    try {
      const result: BoardPageList = await searchBoard(
        currentPage,
        searchTerm,
        category,
      );

      if (searchTerm.trim() === '') {
        setFilteredBoards([]); // 검색어가 없을 때 빈 배열 설정
        setTotalPagesFromServer(0);
      } else {
        const filtered = result.resListBoardDtos?.filter(
          (board) =>
            board.title.toLowerCase().includes(searchTerm) ||
            board.content.toLowerCase().includes(searchTerm),
        );

        setTotalPagesFromServer(result.totalPages as number); // 서버에서 받아온 totalPages 설정
        setFilteredBoards(filtered ?? []); // 필터링된 게시물
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBoardContent = () => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      );
    }

    if (filteredBoards.length === 0) {
      return (
        <div>
          <div className={styles['no-result']}>검색 결과가 없습니다.</div>
        </div>
      );
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

      const categoryMap: Record<string, number> = {
        NOTICE: 0,
        ACADEMIC: 1,
      };
      return combinedBoards.map((board, index) => (
        <div key={`board-${board.id}`}>
          <div className={styles['board-wrapper']}>
            <BoardItem
              board={board}
              category={categoryMap[board.category] ?? 3} // 변환된 카테고리 값 전달
              pinned={pinned}
            />
          </div>
          {index < combinedBoards.length - 1 && (
            <div className={styles.divider}></div>
          )}
        </div>
      ));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>검색 결과</h2>
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']} />
        <Pagination
          totalPages={totalPagesFromServer}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <div className={styles['spacer']} />
      </div>
    </div>
  );
}
