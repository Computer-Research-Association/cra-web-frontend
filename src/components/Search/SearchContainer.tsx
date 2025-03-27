import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BoardPageList } from '~/models/Board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getBoardsByCategory } from '~/api/board.ts';
import LoadingSpinner from '../Common/LoadingSpinner.tsx';
import SearchList from './SearchList.tsx';

function SearchContainer({ category }: { category: number }) {
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

  const pinned = Array.isArray(boardsQuery.data?.resBoardPinDtos)
    ? boardsQuery.data.resBoardPinDtos
    : [];

  return (
    <SearchList
      category={category}
      boardsQuery={boards}
      pinned={pinned}
      totalPages={totalPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default SearchContainer;
