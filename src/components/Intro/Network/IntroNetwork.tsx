import { useEffect, useState } from 'react';
import CRA_IMAGE1 from '~/assets/images/main/crabig.jpg';
import CRA_IMAGE2 from '~/assets/images/main/crastudy2.jpg';
import CRA_IMAGE3 from '~/assets/images/main/cradevelop.jpg';
import styles from './IntroNetwork.module.css';

function IntroNetwork() {
  const [isVertical, setIsVertical] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth <= 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.club}>
      {isVertical ? (
        <>
          <div className={styles['club-container']}>
            <div className={styles['club-card']}>
              <div className={styles['club-title']}>
                <p>탄탄하고 끈끈한 네트워크</p>
              </div>
              {/* 이미지 1 */}
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE1} />
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>현재 재학생 약 50명, 졸업생 약 200명으로 구성</p>
                  <p>되어 있으며, 매년 재학생과 졸업생 모두가 모이는</p>
                  <p>‘큰모임’이 진행됩니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['club-container']}>
            <div className={styles['club-card']}>
              <div className={styles['club-title']}>
                <p>함께 성장하기에 최고로 좋은 환경</p>
              </div>
              {/* 이미지 2 */}
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE2} />
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>
                    선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동료들이
                    기다리고 있습니다.
                  </p>
                  <p>24시간 이용 가능한 동방에서 </p>
                  <p>
                    모르는 것이 있으면 서로 물어보거나 토론을 하기도 합니다.
                  </p>
                </div>
                <div className={styles['club-content1']}>
                  <p>단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토론하라!’</p>
                  <p>하브루타 공부법으로 더욱 심도있게 탐구하고 토론합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['club-container']}>
            <div className={styles['club-card']}>
              <div className={styles['club-title']}>
                <p>리얼로다가! 개발을 합니다</p>
              </div>
              {/* 이미지 3 */}
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE3} />
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>신입회원은 방학 프로젝트를 진행하게 됩니다.</p>
                  <p>
                    선배의 가이드와 함께 지식을 공부하고 실제로 프로젝트를
                    기획하며 개발합니다.
                  </p>
                </div>
                <div className={styles['club-content1']}>
                  <p>
                    더 나아가, 실제로 개발의 결과물을 바탕으로 서비스를 출시할
                    수도 있습니다.
                  </p>
                  <p>현재 서비스 중인 프로젝트에 투입되어 </p>
                  <p>
                    서비스 유지보수 및 유저와 소통하는 방법을 학부생으로서
                    경험하게 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 모바일 디자인 */}
          <div className={styles['club-container']}>
            <div className={styles['club-card']}>
              <div className={styles['club-title']}>
                <p>탄탄하고 끈끈한</p>
                <p>네트워크</p>
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>현재 재학생 약 50명, 졸업생 약 200명으로 구성</p>
                  <p>되어 있으며, 매년 재학생과 졸업생 모두가 모이</p>
                  <p>는 ‘큰모임’이 진행됩니다.</p>
                </div>
                <div className={styles['club-content1']}>
                  <p>재학생들은 대기업, 공기업, 스타트업, 실리콘 밸</p>
                  <p>리, 대학원 등 다양한 직군에 계시는 졸업생 선배</p>
                  <p>님들로부터 많은 도움을 받을 수 있습니다.</p>
                </div>
              </div>
            </div>
            <div className={styles['club-image']}>
              <img src={CRA_IMAGE1} />
            </div>
          </div>

          <div className={styles['club-container']}>
            <div className={styles['club-image']}>
              <img src={CRA_IMAGE2} />
            </div>
            <div className={styles['club-card1']}>
              <div className={styles['club-title']}>
                <p>함께 성장하기에</p>
                <p>최고로 좋은 환경</p>
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동</p>
                  <p>료들이 기다리고 있습니다. 24시간 이용 가능한</p>
                  <p>동방에서 모르는 것이 있으면 서로 물어보거나 토</p>
                  <p>론을 하기도 합니다.</p>
                </div>
                <div className={styles['club-content1']}>
                  <p>단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토</p>
                  <p>론하라!’ 하브루타 공부법으로 더욱 심도있게 탐</p>
                  <p>구하고 토론합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['club-container']}>
            <div className={styles['club-card']}>
              <div className={styles['club-title']}>
                <p>리얼로다가!</p>
                <p>개발을 합니다</p>
              </div>
              <div className={styles['club-content']}>
                <div className={styles['club-content1']}>
                  <p>신입회원은 방학 프로젝트를 진행하게 됩니다. 선</p>
                  <p>배의 가이드와 함께 지식을 공부하고 실제로 프로</p>
                  <p>젝트를 기획하며 개발합니다.</p>
                </div>
                <div className={styles['club-content1']}>
                  <p>더 나아가, 실제로 개발의 결과물을 바탕으로 서</p>
                  <p>비스를 출시할 수도 있습니다. 현재 서비스 중인</p>
                  <p>프로젝트에 투입되어 서비스 유지보수 및 유저와</p>
                  <p>소통하는 방법을 학부생으로서 경험하게 됩니다.</p>
                </div>
              </div>
            </div>
            <div className={styles['club-image']}>
              <img src={CRA_IMAGE3} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default IntroNetwork;
