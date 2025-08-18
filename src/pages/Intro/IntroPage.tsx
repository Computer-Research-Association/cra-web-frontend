// import HeaderIntro from '~/components/Header/Intro-Header/HeaderIntro';
import IntroTop from '~/components/Intro/Top/IntroTop';
import IntroCRA from '~/components/Intro/CRA/IntroCRA';
import IntroHistory from '~/components/Intro/History/IntroHistory';
import IntroNetwork from '~/components/Intro/Network/IntroNetwork';
import IntroProjects from '~/components/Intro/Projects/IntroProjects';
import styles from './IntroPage.module.css';
import { useEffect, useRef, useState } from 'react';

export default function IntroPage() {
  useEffect(() => {
    window.console.log(
      '%cCRA',
      'color: #00cfff; font-size: 4rem; font-family: "Pretendard Bold", BlinkMacSystemFont, Roboto, "Droid Sans", "Helvetica Neue", "Apple SD Gothic Neo", "sans-serif", sans-serif; font-weight: 700; text-shadow: 1px 2px 3px #a0e0f3;',
    );
  }, []);
  const recruitRef = useRef<HTMLDivElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false); // ✅ 강조 효과 상태 추가
  const today = new Date();
  const RECRUIT_START_DATE = new Date('2025-08-30'); // 시작 날짜
  const RECRUIT_END_DATE = new Date('2025-09-10'); // 종료 날짜
  const isRecruitAvailable =
    RECRUIT_END_DATE >= today && today >= RECRUIT_START_DATE;

  const scrollToRecruit = () => {
    recruitRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    setIsHighlighted(true);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 2000);
  };
  return (
    <div className={styles.container}>
      <IntroTop recruitRef={recruitRef} isHighlighted={isHighlighted} />
      <IntroCRA />
      <IntroHistory />
      <IntroNetwork />
      <IntroProjects />

      <button className={styles.goToRecruitBtn} onClick={scrollToRecruit}>
        {isRecruitAvailable ? <p>지원하기</p> : <p>지원이 마감되었습니다</p>}
      </button>
    </div>
  );
}
