import { Link } from 'react-router-dom';
import Icon from '~/assets/images/warning-icon.png';
import styles from './TempPage.module.css';

function ComingSoonPage() {
  return (
    <div className={styles.container}>
      <img src={Icon} />
      <p className={styles.title}>페이지 준비 중입니다!</p>
      <p className={styles.content}>
        빠른 시일 내에 서비스를 제공할 예정입니다.
        <br />
        잠시만 기다려 주세요!
      </p>
      <Link to="/" className={styles.link}>
        홈으로
      </Link>
    </div>
  );
}

export default ComingSoonPage;
