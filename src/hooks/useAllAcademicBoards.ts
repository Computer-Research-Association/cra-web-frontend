import { useQuery, useQueries } from '@tanstack/react-query';
import { Board, BoardPageList } from '~/models/Board.ts';
import { getBoardsByCategory } from '~/api/board.ts';
import { CATEGORY } from '~/constants/category.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';

export function useAllAcademicBoards(enabled = true): Board[] {
  const page0Query = useQuery<BoardPageList>({
    queryKey: QUERY_KEY.board.boards(CATEGORY.ACADEMIC, 0),
    queryFn: () => getBoardsByCategory(CATEGORY.ACADEMIC, 0),
    staleTime: 5 * 60 * 1000,
    enabled,
  });

  const totalPages = page0Query.data?.totalPages ?? 1;

  const remainingQueries = useQueries({
    queries: Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      queryKey: QUERY_KEY.board.boards(CATEGORY.ACADEMIC, i + 1),
      queryFn: () => getBoardsByCategory(CATEGORY.ACADEMIC, i + 1),
      staleTime: 5 * 60 * 1000,
      enabled,
    })),
  });

  return [
    ...(page0Query.data?.resListBoardDtos ?? []),
    ...remainingQueries.flatMap((q) => q.data?.resListBoardDtos ?? []),
  ];
}
