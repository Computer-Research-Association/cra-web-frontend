import { useEffect, useState } from 'react';
import CRA_IMAGE1 from '~/assets/images/main/crabig.jpg?format=webp&as=srcset';
import CRA_IMAGE2 from '~/assets/images/main/crastudy1.jpg?format=webp&as=srcset';
import CRA_IMAGE3 from '~/assets/images/main/cradevelop.jpg?format=webp&as=srcset';
import styles from './IntroNetwork.module.css';

// 컴포넌트에 들어갈 요소들 정의
const clubContents = [
  {
    title: ['탄탄하고 끈끈한 네트워크'],
    image: CRA_IMAGE1,
    content: [
      [
        '현재 재학생 약 50명, 졸업생 약 200명으로 구성',
        '되어 있으며, 매년 재학생과 졸업생 모두가 모이는',
        '‘큰모임’이 진행됩니다.',
      ],
      [
        '재학생들은 대기업, 공기업, 스타트업, 실리콘 밸리,',
        '대학원 등 다양한 직군에 계시는 졸업생 선배님들',
        '로부터 많은 도움을 받을 수 있습니다.',
      ],
    ],
  },
  {
    title: ['함께 성장하기에 좋은 환경'],
    image: CRA_IMAGE2,
    content: [
      [
        '선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동료',
        '들이 기다리고 있습니다. 24시간 이용 가능한 동방',
        '에서 모르는 것이 있으면 서로 물어보거나 토론을',
        ' 하기도 합니다.',
      ],
      [
        '단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토론',
        '하라!’ 하브루타 공부법으로 더욱 심도있게 탐구',
        '하고 토론합니다.',
      ],
    ],
  },
  {
    title: ['리얼로다가! 개발을 합니다'],
    image: CRA_IMAGE3,
    content: [
      [
        '신입회원은 방학 프로젝트를 진행하게 됩니다.',
        '선배의 가이드와 함께 지식을 공부하고 실제로',
        '프로젝트를 기획하며 개발합니다.',
      ],
      [
        '더 나아가, 실제로 개발의 결과물을 바탕으로 서',
        '비스를 출시할 수도 있습니다. 현재 서비스 중인 ',
        '프로젝트에 투입되어 서비스 유지보수 및 유저와 ',
        '소통하는 방법을 학부생으로서 경험하게 됩니다.',
      ],
    ],
  },
];

function IntroNetwork() {
  // 화면 크기를 감지
  const [isVertical, setIsVertical] = useState(window.innerWidth <= 1150);

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth <= 1150);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.club}>
      {/* map을 이용한 반복적 배치 */}
      {clubContents.map(({ title, image, content }, index) => (
        <div key={index} className={styles['club-container']}>
          {/* 화면 크기를 감지해서 콘텐츠들의 배치를 바꿈 */}
          {isVertical ? (
            // 모바일 레이아웃 (이미지를 내용 위에 배치)
            <div className={styles['club-card']}>
              {/* 제목 */}
              <div className={styles['club-title']}>
                {title.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {/* 이미지 */}
              <div className={styles['club-image']}>
                <img srcSet={image} loading="lazy" />
              </div>

              {/* 내용 */}
              <div className={styles['club-content']}>
                {content.map((group, i) => (
                  <div key={i} className={styles['club-content1']}>
                    {group.map((text, j) => (
                      <p key={j}>{text}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // PC 레이아웃 (이미지와 내용을 좌우로 번갈아 배치)
            <>
              {index % 2 !== 0 && (
                <div className={styles['club-image']}>
                  <img srcSet={image} loading="lazy" />
                </div>
              )}
              <div className={styles['club-card']}>
                {/* 제목 */}
                <div className={styles['club-title']}>
                  {title.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                {/* 내용 */}
                <div className={styles['club-content']}>
                  {content.map((group, i) => (
                    <div key={i} className={styles['club-content1']}>
                      {group.map((text, j) => (
                        <p key={j}>{text}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 이미지 */}
              {index % 2 === 0 && (
                <div className={styles['club-image']}>
                  <img srcSet={image} loading="lazy" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default IntroNetwork;
