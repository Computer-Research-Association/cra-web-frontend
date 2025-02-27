import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { BoardPageList, Board } from '~/models/Board.ts';
import { Havruta } from '~/models/Havruta.ts';
import {
  getHavrutaBoards,
  getHavrutaBoardsByHavrutaId,
} from '~/api/havruta/havrutaBoard.ts';
import { getAllHavrutas } from '~/api/havruta/havruta.ts';
import HavrutaBoardList from './HavrutaBoardList.tsx';
import LoadingSpinner from '~/components/Common/LoadingSpinner.tsx';

function HavrutaBoardContainer() {
  const [selectedHavrutaId, setSelectedHavrutaId] = useState<number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 10;

  // 전체 게시물 개수 쿼리
  // const havrutaBoardCountQuery = useQuery<HavrutaBoard[]>({
  //   queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsCount(),
  //   queryFn: async () => getHavrutaBoardsCount(),
  // });

  // 전체 게시물 가져오기 쿼리
  const havrutaBoardQuery = useQuery<BoardPageList>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoards(currentPage),
    queryFn: async () => getHavrutaBoards(currentPage),
  });

  // 과목별 게시물 개수 쿼리 (selectedHavrutaId가 선택되었을 때만 실행)
  // const havrutaBoardCountByHavrutaIdQuery = useQuery<HavrutaBoard[]>({
  //   queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsCountByHavrutaId(
  //     selectedHavrutaId ?? 1, // 기본값 1을 사용 (null이면 1로 설정)
  //   ),
  //   queryFn: async () =>
  //     selectedHavrutaId !== null
  //       ? getHavrutaBoardsCountByHavrutaId(selectedHavrutaId)
  //       : Promise.resolve([]),
  //   enabled: selectedHavrutaId !== null, // selectedHavrutaId가 null이 아닐 때만 실행
  // });

  // 과목별 게시물 가져오기 쿼리 (selectedHavrutaId가 선택되었을 때만 실행)
  const havrutaBoardByHavrutaIdQuery = useQuery<BoardPageList>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsByHavrutaId(
      selectedHavrutaId ?? 1, // 기본값 1을 사용
      currentPage,
    ),
    queryFn: async () =>
      selectedHavrutaId !== null
        ? getHavrutaBoardsByHavrutaId(selectedHavrutaId, currentPage)
        : Promise.resolve({ resListBoardDtoList: [], totalPages: 0 }), // 빈 데이터 반환
    enabled: selectedHavrutaId !== null, // selectedHavrutaId가 null이 아닐 때만 실행
  });

  // 하브루타 과목 쿼리
  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getAllHavrutas(),
  });

  if (havrutaBoardQuery.isLoading || havrutaBoardByHavrutaIdQuery.isLoading)
    return <LoadingSpinner />;

  const havrutaBoards = Array.isArray(
    selectedHavrutaId === null
      ? havrutaBoardQuery.data?.resListBoardDtoList
      : havrutaBoardByHavrutaIdQuery.data?.resListBoardDtoList,
  )
    ? selectedHavrutaId === null
      ? havrutaBoardQuery.data?.resListBoardDtoList
      : havrutaBoardByHavrutaIdQuery.data?.resListBoardDtoList
    : [];

  // 전체 게시물 개수 또는 과목별 게시물 개수 계산

  const totalPage =
    selectedHavrutaId === null
      ? havrutaBoardQuery.data?.totalPages || 1
      : havrutaBoardByHavrutaIdQuery.data?.totalPages || 1;

  return (
    <HavrutaBoardList
      havrutaQuery={havrutaQuery}
      havrutaBoardQuery={havrutaBoards as Board[]}
      totalPages={totalPage}
      currentPage={currentPage}
      selectedHavrutaId={selectedHavrutaId}
      onPageChange={setCurrentPage}
      onHavrutaChange={setSelectedHavrutaId}
    />
  );
}

export default HavrutaBoardContainer;
