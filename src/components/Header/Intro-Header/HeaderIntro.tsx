import { Link } from 'react-router-dom';
import CRALogo from '~/assets/images/cra-logo.png?format=webp&as=srcset';
import styles from './HeaderIntro.module.css';

export default function HeaderIntro() {
  return (
    <div className={styles.HeaderIntro}>
      {/* 상단 헤더 */}
      <ul className={styles.UlIntro}>
        <Link to="./intro">
          <li className={`${styles.LiIntro} ${styles.LiImg}`}>
            <img srcSet={CRALogo} className={styles.Logo} loading="lazy" />
          </li>
        </Link>
        <Link to="./main" className={`${styles.LiIntro} ${styles.NavbarLink}`}>
          int main()
        </Link>
      </ul>
    </div>
  );
}
