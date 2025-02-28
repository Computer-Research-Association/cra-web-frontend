import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Comment } from '~/models/Comment';
import styles from './OtherUserModal.module.css';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

interface CommentUserModalProps {
  closeModal: () => void;
  comment: Comment;
}

const CommentUserModal = ({ closeModal, comment }: CommentUserModalProps) => {
  const gitHubLink = 'https://github.com/' + comment.resUserDetailDto.githubId;

  return (
    <div className={styles.boardContainer}>
      <Modal
        className={styles.boardModalContent}
        overlayClassName={styles.boardOverlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-body']}>
          <div className={styles['first-body']}>
            <img
              src={
                comment.resUserDetailDto.imgUrl
                  ? comment.resUserDetailDto.imgUrl
                  : DEFAULT_PROFILE
              }
              className={styles.profile}
            />
            <div className={styles['user-info']}>
              <div className={styles['semester']}>
                CRA {comment.resUserDetailDto.term}
              </div>
              <div className={styles['name']}>
                {comment.resUserDetailDto.name}
              </div>
              <div className={styles['student-number']}>
                {comment.resUserDetailDto.studentId}
              </div>
            </div>
          </div>
          <div className={styles['hanmadi']}>
            {comment.resUserDetailDto.greetingMessage}
          </div>
        </div>
        <div className={styles['extra-info']}>
          <div>
            GitHub 프로필 |{' '}
            <Link to={gitHubLink} className={styles.GitHubLink} target="_blank">
              {comment.resUserDetailDto.githubId}
            </Link>
          </div>
          <div> 이메일 | {comment.resUserDetailDto.email}</div>
          <div className={styles['line']} />
        </div>
      </Modal>
    </div>
  );
};

export default CommentUserModal;
