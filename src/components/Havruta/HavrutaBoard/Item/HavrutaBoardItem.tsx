import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCommentsCountByCategory } from '~/api/comment';
import { HavrutaBoard } from '~/models/Havruta.ts';
import styles from './HavrutaBoardItem.module.css';
import COMMENT from '~/assets/images/comment_img.png';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

export default function HavrutaBoardItem({
  havrutaBoard,
}: {
  havrutaBoard: HavrutaBoard;
}) {
  const [commentCnt, setCommentCnt] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const count = await getCommentsCountByCategory(
          havrutaBoard.id as number,
        );
        setCommentCnt(count);
      } catch (error) {
        console.error('댓글 수를 가져오는 중 오류 발생:', error);
      }
    };
    void fetchCommentsCount();
  }, [havrutaBoard.id]);

  const truncatedContent =
    havrutaBoard.content.length > 40
      ? `${havrutaBoard.content.substring(0, 40)}...`
      : havrutaBoard.content;

  return (
    <Link to={`/havruta/view/${havrutaBoard.id}`} className={styles.TempLink}>
      <div className={styles.BoardItemContainer}>
        <div>
          <img
            src={
              havrutaBoard.resUserDetailDto.imgUrl
                ? havrutaBoard.resUserDetailDto.imgUrl
                : DEFAULT_PROFILE
            }
            className={styles.profile}
          />
          <div className={styles['board-user-name']}>
            {havrutaBoard.resUserDetailDto.name}
            <div className={styles['board-info']}>
              <span>{havrutaBoard.createdAt?.toString().substring(0, 10)}</span>
              <span>
                <img src={COMMENT} className={styles['comment-img']} />
              </span>
              <span style={{ color: '#2CB4DB' }}>
                {commentCnt !== null ? commentCnt : '로딩 중'}
              </span>
            </div>
          </div>

          <div className={styles.BoardTitle}>
            <div className={styles.BoardTitle}>{havrutaBoard.title}</div>
            <div className={styles.BoardProfessor}>
              {havrutaBoard.havrutaDto ? (
                <>
                  {havrutaBoard.havrutaDto.classname} (
                  {havrutaBoard.havrutaDto.professor})
                </>
              ) : (
                'CRA (크라)'
              )}
            </div>
          </div>
        </div>
        <div className={styles.BoardContent}>{truncatedContent}</div>
      </div>
    </Link>
  );
}
