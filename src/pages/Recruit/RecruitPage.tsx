import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Cra from '~/components/Recruit/CRA/Cra';
import styles from './RecruitPage.module.css';
import Banner from '~/components/Recruit/Banner/Banner';
import Talent from '~/components/Recruit/Talent/Talent';
import Calender from '~/components/Recruit/Calender/Calender';

const RECRUITLINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSd-Yq9rq7tTuYXyn_RnkEvQRXP7yYVJLAWhChnPnMKtRQqrsQ/viewform';

export default function RecruitPage() {
  const recruitTalentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }, // 30% 이상 보이면 실행
    );

    if (recruitTalentRef.current) {
      observer.observe(recruitTalentRef.current);
    }

    return () => {
      if (recruitTalentRef.current) {
        observer.unobserve(recruitTalentRef.current);
      }
    };
  }, []);

  //---------------------디지인 시도----------------------------
  const [isExpanding, setIsExpanding] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanding(true); // 애니메이션 시작 (늘어남)
    }, 500); // 1초 뒤에 CR과 A가 이동 시작

    const resetTimer = setTimeout(() => {
      setIsExpanding(false); // 3초 뒤에 원래대로 돌아가게
    }, 3000); // 4.5초 뒤에 애니메이션을 원래 상태로 되돌리기

    const scrollTimer = setTimeout(() => {
      titleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setTimeout(() => {
        setIsExpanding(true); // 다시 벌어짐
      }, 1000); // 스크롤이 끝난 후 1초 뒤 실행
    }, 3800); // 애니메이션 종료 직후 실행

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
      clearTimeout(scrollTimer);
    };
  }, []);
  //------------------------------------------------------------

  return (
    <div className={styles['recruit-container']}>
      <Cra isExpanding={isExpanding} />
      <Banner titleRef={titleRef} recruitTalentRef={recruitTalentRef} />
      <Talent recruitTalentRef={recruitTalentRef} isVisible={isVisible} />
      <Calender />
      <div className={styles['recruit-apply']}>
        <h1>CRA와 함께 성장하고 싶다면</h1>
        {/* 리크루팅 링크 변경 */}
        <Link to={RECRUITLINK}>
          <button className={styles['button-style']}>지원하기</button>
        </Link>
      </div>
    </div>
  );
}
