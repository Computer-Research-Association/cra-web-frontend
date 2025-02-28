import { Link } from 'react-router-dom';
import { CATEGORY } from '~/constants/category.ts';
import MainBoardList from './MainBoardList.tsx';
import CRANG from '~/assets/images/Status_Crang.png';
import CRANGHOVER from '~/assets/images/crang1_hover.gif';
import styles from './MainPage.module.css';
import { useState } from 'react';

export default function MainPage() {
  const [imgSrc, setImgSrc] = useState<string>(CRANG);

  return (
    <div className={styles.container}>
      <div className={styles['activity-section']}>
        <div className={styles['activity-block']}>
          <img
            src={imgSrc}
            onMouseEnter={() => setImgSrc(CRANGHOVER)}
            onMouseLeave={() => setImgSrc(CRANG)}
          />
        </div>
      </div>
      <div className={styles['notice-section']}>
        <Link to="/notice" className={styles.link}>
          동아리 공지사항
        </Link>
        <MainBoardList category={CATEGORY.NOTICE} />
      </div>
      <div className={styles['notice-section']}>
        <Link to="/academic" className={styles.link}>
          학술 게시판 내용
        </Link>
        <MainBoardList category={CATEGORY.ACADEMIC} />
      </div>
    </div>
  );
}
