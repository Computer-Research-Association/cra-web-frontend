import { Link } from 'react-router-dom';
import Icon from '~/assets/images/develop-icon.png?format=webp&as=srcset';
import styles from './TempPage.module.css';

function ComingSoonPage() {
  return (
    <div className={styles.container}>
      <img srcSet={Icon} loading="lazy" />
      <p className={styles.title}>업데이트 중입니다!</p>
      <p className={styles.content}>
        새로운 기능을 추가하고 있어요. 곧 만나볼 수 있어요!
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
