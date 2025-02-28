import { Link } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Havruta } from '~/models/Havruta.ts';
import { Board } from '~/models/Board.ts';
import SideBar from './Sidebar/HavrutaSidebar.tsx';
import Dropdown from './Dropdown/HavrutaDropdown.tsx';
import Pagination from '~/components/Pagination/Pagination.tsx';
import HavrutaBoardItem from '~/components/Havruta/HavrutaBoard/Item/HavrutaBoardItem.tsx';
import styles from './HavrutaBoardList.module.css';

interface HavrutaBoardListProps {
  havrutaQuery: UseQueryResult<Havruta[], unknown>;
  havrutaBoardQuery: Board[];
  totalPages: number;
  currentPage: number;
  selectedHavrutaId: number | null;
  onPageChange: (_page: number) => void;
  onHavrutaChange: (_id: number | null) => void;
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
    if (!havrutaBoardQuery || havrutaBoardQuery.length === 0) {
      return (
        <div className={styles.container}>게시물이 존재하지 않습니다.</div>
      );
    }

    return havrutaBoardQuery
      .filter((havrutaBoard) => havrutaBoard.id !== undefined)
      .map((havrutaBoard, index) => (
        <div key={`havruta-${havrutaBoard.id}`}>
          <div className={styles['board-wrapper']}>
            <HavrutaBoardItem havrutaBoard={havrutaBoard} />
          </div>
          {index < havrutaBoardQuery.length - 1 && (
            <div className={styles.divider}></div>
          )}
        </div>
      ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>하브루타 게시판</h2>
      <div className={styles.dropdown}>
        <Dropdown
          havrutaQuery={havrutaQuery}
          selectedHavrutaId={selectedHavrutaId}
          onHavrutaChange={onHavrutaChange}
          onPageChange={onPageChange}
        />
        <Link className={styles.MobileWriteLink} to="/havruta/write">
          글쓰기
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <SideBar
            havrutaQuery={havrutaQuery}
            selectedHavrutaId={selectedHavrutaId}
            onHavrutaChange={onHavrutaChange}
            onPageChange={onPageChange}
          />
        </div>
        <div className={styles.boardContent}>
          <div className={styles.boardList}>{renderBoardContent()}</div>
          <div className={styles['board-list-footer']}>
            <div className={styles.spacer}></div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />

            <Link className={styles.WriteLink} to="/havruta/write">
              글쓰기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
