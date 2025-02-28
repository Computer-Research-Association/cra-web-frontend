import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import styles from './MainBoardItem.module.css';

export default function BoardItem({ board }: { board: Board }) {
  return (
    <Link
      to={`/${board.category}/view/${board.id}`}
      className={styles.TempLink}
    >
      <div className={styles.BoardItemContainer}>
        <div>
          <div className={styles.BoardTitle}>{board.title}</div>
          <div className={styles.BoardCreated}>
            {board.createdAt
              ? new Date(board.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              : '날짜 없음'}
          </div>
        </div>
      </div>
    </Link>
  );
}
