import HeaderIntro from '~/components/Header/Intro-Header/HeaderIntro';
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
      <HeaderIntro />
      <IntroTop recruitRef={recruitRef} isHighlighted={isHighlighted} />
      <IntroCRA />
      <IntroHistory />
      <IntroNetwork />
      <IntroProjects />

      <button className={styles.goToRecruitBtn} onClick={scrollToRecruit}>
        지원하러 가기
      </button>
    </div>
  );
}
