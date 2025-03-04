import { useEffect, useState } from 'react';
import styles from './IntroNetwork.module.css';
import network from '~/data/network.json';

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
      {network.data.map(({ title, image, content }, index) => (
        <div key={index} className={styles['club-container']}>
          {/* 화면 크기를 감지해서 콘텐츠들의 배치를 바꿈 */}
          {isVertical ? (
            // 모바일 레이아웃 (이미지를 내용 위에 배치)
            <div className={styles['club-card']}>
              {/* 제목 */}
              <div className={styles['club-title']}>
                {[title].map((line, i) => (
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
                  <p>{title}</p>
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
