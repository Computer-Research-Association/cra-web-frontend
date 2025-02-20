import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import CommentWrite from '~/components/Comment/Write/CommentWrite.tsx';
import CommentList from '~/components/Comment/List/CommetList.tsx';
import BoardDelete from '~/components/Board/Delete/BoardDelete.tsx';
import HeightSpacer from '~/components/Common/HeightSpacer.tsx';
import Divider from '~/components/Common/Divider.tsx';
import { dateFormat } from '~/utils/dateForm.ts';
import { Viewer } from '@toast-ui/react-editor';
import { FaRegComment, FaRegEdit } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import styles from './HavrutaBoardDetailItem.module.css';
import { createBoardsView } from '~/api/view';
import { getBoardById } from '~/api/board';
import createLike from '~/api/like';
import { BiLike } from 'react-icons/bi';
import { LuEye } from 'react-icons/lu';

const extractFileName = (fileUrl: string) => {
  const decodedUrl = decodeURIComponent(fileUrl);
  const match = decodedUrl.match(/[^/]+\/[^/]+\/[a-f0-9-]+_(.+)/);
  return match ? match[1] : decodedUrl.split('/').pop() || '파일';
};

export default function HavrutaBoardDetailItem({
  board,
  category,
  commentCount,
}: {
  board: Board;
  category: number;
  commentCount: number;
}) {
  const [viewCnt, setViewCnt] = useState(board.view);

  useEffect(() => {
    const viewed = localStorage.getItem(`viewed_${board.id}`);
    if (!viewed) {
      createBoardsView(board.id as number)
        .then(() => {
          localStorage.setItem(`viewed_${board.id}`, 'true');
          return getBoardById(board.id as number);
        })
        .then((updatedBoard) => {
          setViewCnt(updatedBoard.view as number);
          console.log('Updated view count:', updatedBoard.view);
        })
        .catch((err) => console.error('조회수 업데이트 실패:', err));
    }
  }, [board.id]);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCnt, setLikeCnt] = useState<number>(0);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await getBoardById(board.id as number);
        console.log('Fetched board data:', response);
        setLikeCnt(response.likeCount ?? 0);
        setIsLiked(response.viewerLiked ?? false);
      } catch (error) {
        console.error('좋아요 상태를 가져오는 데 실패했습니다:', error);
      }
    };
    void fetchLikeStatus();
  }, [board.id]);

  const handleLike = async () => {
    try {
      const data = await createLike(board.id as number, !isLiked);
      console.log('Response from like API:', data);

      // API 응답을 바로 반영
      setIsLiked(data.liked);
      setLikeCnt(data.likes);
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    }
  };

  const handleDownload = async () => {
    if (!board.fileUrl) {
      return;
    }

    try {
      // ResponseType 설정을 통해 바이너리 데이터 처리
      const response = await fetch(board.fileUrl);
      if (!response.ok) throw new Error('다운로드 실패');

      const contentType = response.headers.get('content-type');
      const blob = await response.blob();

      // Blob 객체 생성 시 명시적으로 type 지정
      const file = new Blob([blob], {
        type: contentType || 'application/octet-stream',
      });

      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = extractFileName(board.fileUrl);
      link.click();

      // 메모리 해제
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
    }
  };

  return (
    <div className={styles['detail-container']}>
      <div className={styles['detail-content']}>
        <div className={styles['title']}>
          {board.havrutaDto?.classname} ({board.havrutaDto?.professor})
        </div>
        <Divider />
        <div className={styles['content-body']}>
          <div className={styles['nav']}>
            <div>
              <span className={styles['nav-title']}>작성자 | </span>
              <span className={styles['nav-content']}>{board.userId}</span>
            </div>
            <div>
              <span className={styles['nav-title']}>작성일 | </span>
              <span className={styles['nav-content']}>
                {dateFormat(board.createdAt)}
              </span>
            </div>
            <div className={styles['fix-button']}>
              <Link
                to={`/${CATEGORY_STRINGS_EN[category]}/edit/${board.id}`}
                className={styles['link']}
              >
                <FaRegEdit size={22} />
              </Link>
              <BoardDelete id={board.id!} category={category} />
            </div>
          </div>
          <div className={styles['content-title']}>{board.title}</div>
          <div className={styles['board-content']}>
            <Viewer initialValue={board.content} />
          </div>

          <div className={styles['comment-count']}>
            <div className={styles['file-section']}>
              {board.fileUrl ? (
                <div className={styles['file-item']}>
                  <a
                    onClick={handleDownload}
                    style={{ cursor: 'pointer' }}
                    className={styles['file-link']}
                  >
                    <IoIosLink />
                    &nbsp;
                    {extractFileName(board.fileUrl)}
                  </a>
                </div>
              ) : (
                <div style={{ visibility: 'hidden' }}> </div>
              )}
            </div>

            <div className={styles['stats-container']}>
              <span className={styles.viewContainer}>
                <LuEye />
                <span>{viewCnt}</span>
              </span>
              <span className={styles.viewContainer}>
                <span onClick={handleLike} className={styles.like}>
                  <BiLike className={isLiked ? styles.activeLike : ''} />
                </span>
                <span>{likeCnt}</span>
              </span>
              <span className={styles.viewContainer}>
                <FaRegComment />
                <span>{commentCount}</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles['footer']}>
          <HeightSpacer space={20} />
          <CommentList id={board.id!} />
          <CommentWrite parentId={undefined} />
        </div>
      </div>
    </div>
  );
}
