import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import craIconBlue from '~/assets/images/cra-logo-blue.png';
import { useAuthStore } from '~/store/authStore.ts';
import { useUIStore } from '~/store/uiStore.ts';
import UserModal from '~/components/Modal/User/MyUser/UserModal';
import styles from './HeaderMain.module.css';
import { AxiosError } from 'axios';
import { useUserStore } from '~/store/userStore';

export default function HeaderMain() {
  const { isAuthenticated, logout } = useAuthStore();
  const { name, imgUrl } = useUserStore();
  const { isMenuOpen, toggleMenu } = useUIStore();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const isMenuOrModalOpen = isMenuOpen || modalOpen;

  const handleLogin = () => {
    void navigate('/login');
  };

  const handleLogout = () => {
    // 내정보
    try {
      void logout();
      closeModal();
      void navigate('/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Login Error:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
        throw new Error('Unexpected Error occurred during Login');
      }
    }
  };

  // const handleMyInfo = () => {
  //   navigate('/in  fo');
  // };
  return (
    <div className={styles['header-main']}>
      <Link to="/">
        {/* <Link to="/main"> */}
        <img src={craIconBlue} alt="크라 아이콘" className={styles.logo} />
      </Link>

      <button
        className={`${styles['menu-toggle']} ${isMenuOrModalOpen ? styles['menu-toggle-active'] : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul
        className={`${styles['nav-menu']} ${isMenuOpen ? styles.active : ''}`}
      >
        <>
          {[
            { path: '/notice', label: 'Notice' },
            { path: '/academic', label: 'Academic' },
            { path: '/book', label: 'Book' },
            { path: '/item', label: 'Item' },
            { path: '/havruta', label: 'Havruta' },
            { path: '/project', label: 'Project' },
          ].map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${styles['link']} ${styles['navbar-link']} ${
                  location.pathname.startsWith(path) ? styles.active : ''
                }`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </>

        <li className={styles['mobile-authbutton']}>
          {isAuthenticated ? (
            <>
              <img
                src={imgUrl}
                className={styles.profile}
                onClick={openModal}
              />
              <p>{name}</p>
            </>
          ) : (
            <p
              className={`${styles['link']} ${styles['navbar-link']}`}
              onClick={() => {
                handleLogin();
                toggleMenu();
              }}
            >
              Login
            </p>
          )}
        </li>
      </ul>
      <div className={styles['desktop-authbutton']}>
        {isAuthenticated ? (
          <>
            <img src={imgUrl} className={styles.profile} onClick={openModal} />
            {/* <p>{name}</p> */}
            {/* <button className={styles.authbutton}>내정보</button> */}
          </>
        ) : (
          <>
            <button className={styles.authbutton} onClick={handleLogin}>
              로그인
            </button>
          </>
        )}
        {modalOpen && (
          <UserModal closeModal={closeModal} handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
