import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Vector from '~/assets/images/Vector/Arrow-Vector.png?format=webp&as=srcset';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png?format=webp&as=srcset';
import Crang from '~/assets/images/Status_Crang.svg';
import styles from './IntroTop.module.css';

const RECRUIT_SEMESTER = '2025-1';

function IntroTop({
  recruitRef,
  isHighlighted,
}: {
  recruitRef: React.RefObject<HTMLDivElement>;
  isHighlighted: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <div className={styles.main} ref={recruitRef}>
        <div className={styles.section}>
          {/* 처음 문구 */}
          <div className={styles.comment}>
            <p>CRA와 함께 성장할 동아리원을 모집합니다</p>
          </div>

          {/* 배너 */}
          <div className={styles.banner}>
            <p>Why not change the</p>
            <p className={styles.helloworld}>hello world!</p>
          </div>

          {/* 크랑이 여러마리 */}
          <div className={styles.CranEES}>
            <img
              className={`${styles.crangE} ${styles.character1}`}
              srcSet={Crang}
              loading="lazy"
            />
            <img
              className={`${styles.crangE} ${styles.character2}`}
              srcSet={Crang}
              loading="lazy"
            />
            <img
              className={`${styles.crangE} ${styles.character3}`}
              srcSet={Crang}
              loading="lazy"
            />
            <img
              className={`${styles.crangE} ${styles.character4}`}
              srcSet={Crang}
              loading="lazy"
            />
          </div>

          {/* 리크루팅 페이지로 가는 버튼 */}
          <Link
            to="/recruit"
            className={`${styles.RecruitBtn} ${isHighlighted ? styles.highlight : ''}`}
          >
            <p>{RECRUIT_SEMESTER} CRA 리크루팅 지원하기</p>
          </Link>

          {/* 누르면 밑으로 내려가는 화살표 */}
          <div className={styles.vector} onClick={scrollToSection}>
            <img srcSet={Vector2} loading="lazy" />
            <img srcSet={Vector} loading="lazy" />
            <div className={styles['interview']}>CRA가 궁금하다면?</div>
          </div>
        </div>
      </div>

      {/* CRA 소개 Hook 문구 */}
      <div ref={ref} className={styles.section2}>
        <h1 className={styles.heading}>
          세대를 아우르는 열정과 끈끈한 유대감의 동아리,
          <br />
          CRA를 소개합니다.
        </h1>
        <div className={styles.glowBackground}></div>
      </div>
    </div>
  );
}

export default IntroTop;
