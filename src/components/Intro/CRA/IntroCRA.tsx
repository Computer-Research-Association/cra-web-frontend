import { useEffect, useState } from 'react';
import styles from './IntroCRA.module.css';

const CRA_YEAR = '30';
const CRA_SERVICE = '11';

function IntroCRA() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 620);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 620);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={styles.cra}>
      {!isMobile ? (
        <>
          {/* Computer Research Assoication */}
          <div className={styles.title}>
            <span className={styles.CapLetter}>C</span>
            <p>omputer</p>
            <span className={styles.CapLetter}>R</span>
            <p>esearch</p>
            <span className={styles.CapLetter}>A</span>
            <p>ssoication</p>
          </div>
        </>
      ) : (
        <>
          <>
            {/* Computer Research Assoication */}
            <div className={styles.CRAtitle}>
              <div className={styles.CRATitleContent}>
                <span className={styles.CapLetter}>C</span>
                <p>omputer</p>
              </div>
              <div className={styles.CRATitleContent}>
                <span className={styles.CapLetter}>R</span>
                <p>esearch</p>
              </div>
              <div className={styles.CRATitleContent}>
                <span className={styles.CapLetter}>A</span>
                <p>ssoication</p>
              </div>
            </div>
          </>
        </>
      )}
      {/* CRA 소개 */}
      <div className={styles.description}>
        <p>
          CRA는 한동대학교 전산 교육과정에 기초하여
          <br />
          한 분야에 국한되지 않는 신기술을 공부하고 습득한 지식과 기술을 통해
          <br />
          <span>‘배워서 남주자’</span>를 실천하는 동아리입니다.
        </p>
      </div>

      {/* CRA 소개 카드 */}
      <div className={styles.content}>
        {/* CARD 1 */}
        <div className={styles.Card}>
          <p className={styles.CardTitle}>CRA가 창립한지</p>
          <p className={styles.CardContent}>{CRA_YEAR}년</p>
        </div>

        {/* CARD 2 */}
        <div className={styles.Card}>
          <p className={styles.CardTitle}>출시 서비스</p>
          <p className={styles.CardContent}>{CRA_SERVICE}개</p>
        </div>

        {/* CARD 3 */}
        <div className={styles.Card}>
          <p className={styles.CardTitle}>선배들과 함께하는</p>
          <p className={styles.CardContent2}>
            정기적인
            <br />
            교류활동
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroCRA;
