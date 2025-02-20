import { Link } from 'react-router-dom';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import { Board } from '~/models/Board.ts';
import styles from './BoardItem.module.css';
import { getCommentsCountByCategory } from '~/api/comment';
import { useEffect, useState } from 'react';
import COMMENT from '~/assets/images/comment_img.png';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

export default function BoardItem({
  board,
  category,
}: {
  board: Board;
  category: number;
}) {
  const [commentCnt, setCommentCnt] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const count = await getCommentsCountByCategory(board.id as number);
        setCommentCnt(count);
      } catch (error) {
        console.error('댓글 수를 가져오는 중 오류 발생:', error);
      }
    };

    void fetchCommentsCount(); // 여기서 비동기 호출을 await 처리합니다.
  }, [board.id]);

  const truncatedContent =
    board.content.length > 40
      ? `${board.content.substring(0, 40)}...`
      : board.content;

  return (
    <Link
      to={`${CATEGORY_STRINGS_EN[category]}/view/${board.id}`}
      className={styles['temp-link']}
    >
      <div className={styles['board-item-container']}>
        <div>
          <img
            src={
              board.resUserDetailDto.imgUrl
                ? board.resUserDetailDto.imgUrl
                : DEFAULT_PROFILE
            }
            className={styles.profile}
          />
          <div className={styles['board-user-name']}>
            {board.resUserDetailDto.name}
            <div className={styles['board-info']}>
              <span>{board.createdAt?.toString().substring(0, 10)}</span>
              <span>
                <img src={COMMENT} className={styles['comment-img']} />
              </span>
              <span style={{ color: '#2CB4DB' }}>
                {commentCnt !== null ? commentCnt : '로딩 중'}
              </span>
            </div>
          </div>
          <div className={styles['board-title']}>
            <div className={styles['board-title']}>{board.title}</div>
          </div>
        </div>
        <div className={styles['board-content']}>{truncatedContent}</div>
      </div>
    </Link>
  );
}
