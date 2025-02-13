import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board.ts';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { CATEGORY_STRINGS_EN } from '~/constants/category_strings_en.ts';
import CommentWrite from '~/components/Comment/Write/CommentWrite.tsx';
import CommentList from '~/components/Comment/List/CommetList.tsx';
import BoardDelete from '~/components/Board/Delete/BoardDelete.tsx';
import HeightSpacer from '~/components/Common/HeightSpacer.tsx';
import Divider from '~/components/Common/Divider.tsx';
import { dateFormat } from '~/utils/dateForm.ts';
import { Viewer } from '@toast-ui/react-editor';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import styles from './BoardDetailItem.module.css';
import { view } from '~/api/view';
import { getBoardById } from '~/api/board';
import viewImage from '~/assets/images/view_img.png';
import createLike from '~/api/like';
import BoardUserModal from '~/components/Modal/User/OtherUser/BoardUserModal';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

// fileUrl에서 원래 파일명만 추출하는 함수
const extractFileName = (fileUrl: string) => {
  const decodedUrl = decodeURIComponent(fileUrl);
  const match = decodedUrl.match(/[^/]+\/[^/]+\/[a-f0-9-]+_(.+)/);
  return match ? match[1] : decodedUrl.split('/').pop() || '파일';
};

export default function BoardDetailItem({
  board,
  category,
  commentCount,
}: {
  board: Board;
  category: number;
  commentCount: number;
}) {
  const [viewCnt, setViewCnt] = useState(board.view);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const viewed = localStorage.getItem(`viewed_${board.id}`);
    if (!viewed) {
      view(board.id as number)
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
  const [likeCnt, setLikeCnt] = useState(board.like);

  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`isLiked_${board.id}`);
    if (storedLikeStatus) {
      setIsLiked(JSON.parse(storedLikeStatus) as boolean); // 로컬 스토리지에서 좋아요 상태 불러오기
    }
  }, [board.id]);

  const handleLike = async () => {
    const newLikeState = !isLiked;
    try {
      await createLike(board.id as number, board.userId as number, isLiked);
      setIsLiked(newLikeState);
      setLikeCnt((prevCount) =>
        newLikeState ? (prevCount as number) + 1 : (prevCount as number) - 1,
      );
      localStorage.setItem(`isLiked_${board.id}`, JSON.stringify(newLikeState));
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    }
  };

  return (
    <div className={styles['detail-container']}>
      <div className={styles['detail-content']}>
        <div className={styles['title']}>
          {CATEGORY_STRINGS[category]} 게시판
        </div>
        <Divider />
        <div className={styles['content-body']}>
          <div className={styles['nav']}>
            <div className={styles.writter}>
              <span className={styles['nav-title']}>작성자 | </span>
              <div>
                <img
                  src={
                    board.resUserDetailDto.imgUrl
                      ? board.resUserDetailDto.imgUrl
                      : DEFAULT_PROFILE
                  }
                  className={styles.profile}
                  onClick={openModal}
                />
                {modalOpen && (
                  <BoardUserModal closeModal={closeModal} board={board} />
                )}
              </div>
              <span className={styles['nav-content']}>
                {board.resUserDetailDto.name}
              </span>
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

            {/* 파일 목록 섹션 수정 */}
            {board.fileUrls && board.fileUrls.length > 0 && (
              <div className={styles['file-section']}>
                <ul className={styles['file-list']}>
                  {board.fileUrls.map((fileUrl, index) => (
                    <li key={index} className={styles['file-item']}>
                      <a
                        href={fileUrl}
                        download={extractFileName(fileUrl)}
                        className={styles['file-link']}
                      >
                        <IoIosLink />
                        &nbsp;
                        {extractFileName(fileUrl)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles['comment-count']}>
            <span className={styles.viewContainer}>
              <img src={viewImage} />
              <span>{viewCnt}</span>
            </span>
            <span className={styles.viewContainer}>
              <button onClick={handleLike}>
                {isLiked ? '좋아요 취소' : '좋아요'}
              </button>
              <span>{likeCnt}</span>
            </span>
            <span className={styles.viewContainer}>
              <span>댓글</span>
              <span>{commentCount}</span>
            </span>
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
