import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Board } from '~/models/Board';
import styles from './OtherUserModal.module.css';

const DEFAULT_PROFILE = import.meta.env.VITE_DEFAULT_IMG as string;

interface BoardUserModalProps {
  closeModal: () => void;
  board: Board;
}

const BoardUserModal = ({ closeModal, board }: BoardUserModalProps) => {
  const gitHubLink = 'https://github.com/' + board.resUserDetailDto.githubId;

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
                board.resUserDetailDto.imgUrl
                  ? board.resUserDetailDto.imgUrl
                  : DEFAULT_PROFILE
              }
              className={styles.profile}
            />
            <div className={styles['user-info']}>
              <div className={styles['semester']}>
                CRA {board.resUserDetailDto.term}
              </div>
              <div className={styles['name']}>
                {board.resUserDetailDto.name}
              </div>
              <div className={styles['student-number']}>
                {board.resUserDetailDto.studentId}
              </div>
            </div>
          </div>
          <div className={styles['hanmadi']}>
            {board.resUserDetailDto.greetingMessage}
          </div>
        </div>
        <div className={styles['extra-info']}>
          <div>
            GitHub 프로필 |{' '}
            <Link to={gitHubLink} className={styles.GitHubLink} target="_blank">
              {board.resUserDetailDto.githubId}
            </Link>
          </div>
          <div> 이메일 | {board.resUserDetailDto.email}</div>
          <div className={styles['line']} />
        </div>
      </Modal>
    </div>
  );
};

export default BoardUserModal;
