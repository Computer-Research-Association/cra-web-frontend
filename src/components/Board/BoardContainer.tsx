import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Board } from '~/models/Board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getBoardsByCategory } from '~/api/board.ts';
import BoardList from './List/BoardList.tsx';

function BoardContainer({ category }: { category: number }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const boardsQuery = useQuery<Board[]>({
    queryKey: QUERY_KEY.board.boards(category, currentPage),
    queryFn: async () => getBoardsByCategory(category, currentPage),
  });

  // 다음 페이지 여부 확인
  const hasNextPage = boardsQuery.data
    ? boardsQuery.data.length === itemsPerPage
    : false;

  return (
    <BoardList
      category={category}
      boardsQuery={boardsQuery}
      totalPages={hasNextPage ? currentPage + 2 : currentPage + 1}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default BoardContainer;
