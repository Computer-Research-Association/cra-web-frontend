import { Link } from 'react-router-dom';
import Vector from '~/assets/images/Vector/Arrow-Vector.png?format=webp&as=srcset';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png?format=webp&as=srcset';
import styles from './Banner.module.css';
import React, { RefObject } from 'react';

const RECRUITLINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSd-Yq9rq7tTuYXyn_RnkEvQRXP7yYVJLAWhChnPnMKtRQqrsQ/viewform';

function Banner({
  titleRef,
  recruitTalentRef,
}: {
  titleRef: RefObject<HTMLParagraphElement>;
  recruitTalentRef: React.RefObject<HTMLDivElement>;
}) {
  const scrollToSection = () => {
    recruitTalentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  return (
    <div className={styles['recruit-main']}>
      <div className={styles['recruit-banner']}>
        <p id={styles['title']}>2025-1 CRA</p>
        <p id={styles['title']}>RECRUITMENT</p>
        <p id={styles['content']}>
          CRA는 함께 성장 할 25-1 기수 동아리원을 모집합니다.
        </p>
        <div ref={titleRef} className={styles['recruit-apply1']}>
          <Link to={RECRUITLINK}>
            <button className={styles['button-style']}>지원하기</button>
          </Link>
        </div>
        <div className={styles['vector']} onClick={scrollToSection}>
          <img srcSet={Vector2} loading="lazy" />
          <img srcSet={Vector} loading="lazy" />
          <img srcSet={Vector2} loading="lazy" />
          <div className={styles['interview']}>모집 개요</div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
