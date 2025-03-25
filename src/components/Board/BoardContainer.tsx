import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BoardPageList } from '~/models/Board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getBoardsByCategory } from '~/api/board.ts';
import BoardList from './List/BoardList.tsx';
import LoadingSpinner from '../Common/LoadingSpinner.tsx';

function BoardContainer({ category }: { category: number }) {
  const [currentPage, setCurrentPage] = useState(0);

  const boardsQuery = useQuery<BoardPageList>({
    queryKey: QUERY_KEY.board.boards(category, currentPage),
    queryFn: async () => getBoardsByCategory(category, currentPage),
  });

  if (boardsQuery.isLoading) return <LoadingSpinner />;
  if (boardsQuery.isError) return <p>Error: {boardsQuery.error?.message}</p>;

  const boards = Array.isArray(boardsQuery.data?.resListBoardDtos)
    ? boardsQuery.data.resListBoardDtos
    : [];
  const totalPage = boardsQuery.data?.totalPages || 1;

  const pinnedBoards = Array.isArray(boardsQuery.data?.resBoardPinDtos)
    ? boardsQuery.data.resBoardPinDtos
    : [];

  return (
    <BoardList
      category={category}
      boardsQuery={boards}
      pinnedBoards={pinnedBoards}
      totalPages={totalPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default BoardContainer;
