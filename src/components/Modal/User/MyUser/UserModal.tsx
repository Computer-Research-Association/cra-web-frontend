import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useUserStore } from '~/store/userStore';
import { FaCog } from 'react-icons/fa'; // Font Awesome에서 cog 아이콘 (설정 아이콘)
import logoutImage from '~/assets/images/logoutImage.png?format=webp&as=srcset';
import styles from './UserModal.module.css';

interface UserModalProps {
  closeModal: () => void;
  handleLogout: () => void;
}

const UserModal = ({ closeModal, handleLogout }: UserModalProps) => {
  const { name, email, studentId, term, githubId, imgUrl, greetingMessage } =
    useUserStore();

  const gitHubLink = 'https://github.com/' + githubId;
  return (
    <>
      <Modal
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-header']}>
          <Link to={`/user/${name}`}>
            <button onClick={closeModal} className={styles['setting-button']}>
              <FaCog />
            </button>
          </Link>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['first-body']}>
            <img srcSet={imgUrl} className={styles.profile} loading="lazy" />
            <div className={styles['user-info']}>
              <div className={styles['semester']}>CRA {term}</div>
              <div className={styles['name']}>{name}</div>
              <div className={styles['student-number']}>{studentId}</div>
            </div>
          </div>
          <div className={styles['hanmadi']}>
            <div>
              {greetingMessage === ''
                ? '나의 한마디를 입력하세요.'
                : greetingMessage}
            </div>
          </div>
        </div>
        <div className={styles['extra-info']}>
          <div>
            GitHub 프로필 |{' '}
            <Link to={gitHubLink} className={styles.GitHubLink} target="_blank">
              {githubId}
            </Link>
          </div>
          <div> 이메일 | {email}</div>
          <div className={styles['line']} />
        </div>
        <a className={styles['logout']} onClick={handleLogout}>
          <img
            srcSet={logoutImage}
            className={styles['logout-image']}
            loading="lazy"
          />
          <div>로그아웃</div>
        </a>
      </Modal>
    </>
  );
};

export default UserModal;
