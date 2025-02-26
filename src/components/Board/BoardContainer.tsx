import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BoardPageList, Board } from '~/models/Board.ts';
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

  const boards = Array.isArray(boardsQuery.data?.resListBoardDtoList)
    ? boardsQuery.data.resListBoardDtoList
    : [];
  const totalPage = boardsQuery.data?.totalPages || 1;

  return (
    <BoardList
      category={category}
      boardsQuery={boards as Board[]}
      totalPages={totalPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default BoardContainer;
