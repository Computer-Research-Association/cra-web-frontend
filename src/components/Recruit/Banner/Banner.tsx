import Vector from '~/assets/images/Vector/Arrow-Vector.png?format=webp&as=srcset';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png?format=webp&as=srcset';
import styles from './Banner.module.css';
import RecruitButton from './RecruitButton';
import React, { RefObject } from 'react';
import recruitDate from '~/data/recruit-date.json';

// const RECRUIT_START_DATE = new Date(recruitDate.applicationPeriod.start);
const SEMESTER = recruitDate.semester;
// const RECRUIT_END_DATE = new Date(recruitDate.applicationPeriod.end);

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
        <p id={styles['title']}>{SEMESTER} CRA</p>
        <p id={styles['title']}>RECRUITMENT</p>
        <p id={styles['content']}>
          CRA와 함께 성장할 {SEMESTER.substring(2)} 기수 동아리원을 모집합니다.
        </p>
        <RecruitButton titleRef={titleRef} />
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
