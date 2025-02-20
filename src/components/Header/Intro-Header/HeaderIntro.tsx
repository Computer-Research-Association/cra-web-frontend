import { Link } from 'react-router-dom';
import CRALogo from '~/assets/images/cra-logo.png';
import styles from './HeaderIntro.module.css';

export default function HeaderIntro() {
  return (
    <div className={styles.HeaderIntro}>
      <ul className={styles.UlIntro}>
        <Link to="./intro">
          <li className={`${styles.LiIntro} ${styles.LiImg}`}>
            <img src={CRALogo} className={styles.Logo} />
          </li>
        </Link>
        <Link to="./main" className={`${styles.LiIntro} ${styles.NavbarLink}`}>
          MAIN PAGE
        </Link>
      </ul>
    </div>
  );
}
