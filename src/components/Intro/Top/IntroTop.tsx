import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Vector from '~/assets/images/Vector/Arrow-Vector.png';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png';
import Crang1 from '~/assets/images/pixelcrang/pixelcrang1.svg';
import Crang2 from '~/assets/images/pixelcrang/pixelcrang2.svg';
import Crang3 from '~/assets/images/pixelcrang/pixelcrang3.svg';
import Crang4 from '~/assets/images/pixelcrang/pixelcrang4.svg';
import blurround from '~/assets/images/black-blur-round.svg';
import styles from './IntroTop.module.css';

function IntroTop() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.section}>
          {/* 처음 문구 */}
          <div className={styles.comment}>
            CRA와 함께 성장할 동아리원을 모집합니다
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
              src={Crang1}
            />
            <img
              className={`${styles.crangE} ${styles.character2}`}
              src={Crang2}
            />
            <img
              className={`${styles.crangE} ${styles.character3}`}
              src={Crang3}
            />
            <img
              className={`${styles.crangE} ${styles.character4}`}
              src={Crang4}
            />
          </div>

          {/* 리크루팅 페이지로 가는 버튼 */}
          <Link to="/recruit" className={styles.RecruitBtn}>
            <p>2025-1 CRA RECRUITMENT</p>
          </Link>

          {/* 누르면 밑으로 내려가는 화살표 */}
          <div className={styles.vector} onClick={scrollToSection}>
            <img src={Vector2} />
            <img src={Vector} />
          </div>
        </div>
      </div>

      {/* CRA 소개 Hook 문구 */}
      <div ref={ref} className={styles.section2}>
        <div className={styles.comment2}>
          <div>세대를 아우르는 열정과 끈끈한 유대감의 동아리,</div>
          <div>CRA를 소개합니다.</div>
        </div>
        <img className={styles.BlurRound} src={blurround} />
      </div>
    </div>
  );
}

export default IntroTop;
