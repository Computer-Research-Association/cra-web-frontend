import { Link } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Havruta, HavrutaBoard } from '~/models/Havruta.ts';
import Sidebar from './Sidebar/HavrutaSidebar.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import HavrutaBoardItem from '~/components/Havruta/HavrutaBoard/Item/HavrutaBoardItem.tsx';
import styles from './HavrutaBoardList.module.css';

interface HavrutaBoardListProps {
  havrutaQuery: UseQueryResult<Havruta[], unknown>;
  havrutaBoardQuery: UseQueryResult<HavrutaBoard[], unknown>;
  totalPages: number;
  currentPage: number;
  selectedHavrutaId: number | null;
  onPageChange: (page: number) => void;
  onHavrutaChange: (id: number | null) => void;
}

export default function HavrutaBoardList({
  havrutaQuery,
  havrutaBoardQuery,
  totalPages,
  currentPage,
  selectedHavrutaId,
  onPageChange,
  onHavrutaChange,
}: HavrutaBoardListProps) {
  const renderBoardContent = () => {
    if (havrutaBoardQuery.isLoading) {
      return (
        <div>
          <div className={styles['board-wrapper']}>
            데이터를 불러오는 중입니다...
          </div>
        </div>
      );
    }

    if (havrutaBoardQuery.isError) {
      return (
        <div className={styles['board-wrapper']}>에러가 발생했습니다!</div>
      );
    }

    if (havrutaBoardQuery.isSuccess) {
      return havrutaBoardQuery.data.length > 0 ? (
        havrutaBoardQuery.data
          .filter((havrutaBoard) => havrutaBoard.id !== undefined)
          .map((havrutaBoard, index) => (
            <div key={`havruta-${havrutaBoard.id}`}>
              <div className={styles['board-wrapper']}>
                <HavrutaBoardItem havrutaBoard={havrutaBoard} />
              </div>
              {index < havrutaBoardQuery.data.length - 1 && (
                <div className={styles['divider']}></div>
              )}
            </div>
          ))
      ) : (
        <div className={styles['board-wrapper']}>게시글이 없습니다.</div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar
          havrutaQuery={havrutaQuery}
          selectedHavrutaId={selectedHavrutaId}
          onHavrutaChange={onHavrutaChange}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>하브루타 게시판</h2>
        <div className={styles.boardList}>{renderBoardContent()}</div>
        <div className={styles['board-list-footer']}>
          <div className={styles['spacer']}></div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />

          <Link className={styles['write-link']} to="/havruta/write">
            글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}
