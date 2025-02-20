import Vector from '~/assets/images/Vector/Arrow-Vector.png';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png';
import styles from './RecruitPage.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import CR from '~/assets/images/RecruitImage/CR.png';
import A from '~/assets/images/RecruitImage/A.png';
import SCRETCH from '~/assets/images/RecruitImage/scretch.png';
import CONTENT from '~/assets/images/RecruitImage/content.png';

export default function RecruitPage() {
  const recruitTalentRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    recruitTalentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
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
    }, 1000); // 1초 뒤에 CR과 A가 이동 시작

    const resetTimer = setTimeout(() => {
      setIsExpanding(false); // 3초 뒤에 원래대로 돌아가게
    }, 4500); // 4초 뒤에 애니메이션을 원래 상태로 되돌리기

    const scrollTimer = setTimeout(() => {
      titleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 4800); // 애니메이션 종료 직후 실행

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className={styles['recruit-container']}>
      <div className={styles['recruit-main1']}>
        <div className={styles['recruit-banner1']}>
          <img
            src={CR}
            className={`${styles['cr-image']} ${isExpanding ? styles['cr-expand'] : ''}`}
          />
          <img
            src={SCRETCH}
            className={`${styles['scratch-image']} ${isExpanding ? styles['scratch-expand'] : ''}`}
          />
          <img
            src={A}
            className={`${styles['a-image']} ${isExpanding ? styles['a-expand'] : ''}`}
          />
          <img
            src={CONTENT}
            className={`${styles['content-image']} ${isExpanding ? styles['content-expand'] : ''}`}
          />
        </div>
      </div>
      <div className={styles['recruit-main']}>
        <div className={styles['recruit-banner']}>
          <p id={styles['title']}>2025-1 CRA</p>
          <p id={styles['title']}>RECRUITMENT</p>
          <p ref={titleRef} id={styles['content']}>
            CRA는 함께 성장 할 25-1 기수 동아리원을 모집합니다.
          </p>
          <div className={styles['recruit-apply1']}>
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf5uTQbDr7i9WjPfI61hMJ_PqDS1Of_fZRNpD8MRzlvnYFsKA/closedform">
              <button className={styles['button-style']}>지원하기</button>
            </Link>
          </div>
          <div className={styles['vector']} onClick={scrollToSection}>
            <img src={Vector2} />
            <img src={Vector} />
            <img src={Vector2} />
          </div>
        </div>
      </div>

      <div className={styles['recruit-talent']}>
        <h2
          ref={recruitTalentRef}
          className={`${styles['recruit-title']} ${isVisible ? styles['animate'] : ''}`}
        >
          이런 사람과 함께 하고 싶어요
        </h2>

        <div ref={recruitTalentRef} className={styles['recruit-talentDetail']}>
          <div>
            <span className={styles['number']}>01</span>
            <p>
              다른 사람과 협력하며 공동의 목표를 <br />
              이루고 서로 배우고 발전하며{' '}
              <span style={{ color: '#2CB4DB' }}>함께 성장</span>하고 싶은 사람
            </p>
          </div>
          <div>
            <span className={styles['number']}>02</span>
            <p>
              어떤 문제든 두려움 없이 극복하려는 의지를 가지고
              <br />
              새로운 기회를 탐구하는 용기와{' '}
              <span style={{ color: '#2CB4DB' }}>도전 의식</span>을 지닌 사람
            </p>
          </div>
          <div>
            <span className={styles['number']}>03</span>
            <p>
              익숙하지 않은 새로운 지식을 접할 때도 적극적으로 받아들이고
              <br />
              실수를 통해 성장하며 자신의 능력을 확장하려고{' '}
              <span style={{ color: '#2CB4DB' }}>노력</span>하는 사람
            </p>
          </div>
          <div>
            <span className={styles['number']}>04</span>
            <p>
              다양한 경험과 지식을 습득하며{' '}
              <span style={{ color: '#2CB4DB' }}>스스로 성장</span>하는 동시에,
              <br />
              자신이 얻은 것들을 주변 사람들에게 아낌없이{' '}
              <span style={{ color: '#2CB4DB' }}>나눠줄 수 있는</span> 사람
            </p>
          </div>
        </div>
      </div>

      <div className={styles['recruit-content']}>
        <h2>모집 개요</h2>
        <div className={styles['recruit-contentDetail']}>
          <div className={styles['content-box']}>
            <h3>핵심 인재상</h3>
            <p>컴퓨터 분야의 최신 기술을 공부 </p>
            <p>및 연구하고 싶은 누구나</p>
          </div>
          <div className={styles['content-box']}>
            <h3>지원 자격</h3>
            <p>신입 하계 방학 프로젝트에 참</p>
            <p>여 가능하신 분</p>
            <br />
            <p>매 학기 개강/종강 총회에 참여</p>
            <p>가능하신 분</p>
          </div>
          <div className={styles['content-box']}>
            <h3>지원 방법</h3>
            <p>1차 서류</p>
            <p style={{ color: 'gray' }}>리크루팅 폼에서 지원서 작성</p>
            <br />
            <p>2차 서류</p>
            <p style={{ color: 'gray' }}>대면 면접 이후 최종합격</p>
          </div>
        </div>
      </div>

      <div className={styles['recruit-calender']}>
        <h2>모집 일정</h2>
        <div className={styles['calender-line']}>
          <div className={styles['calender-box']}>
            <h3>서류 접수</h3>
            <p>2025.3.4.(화)</p>
            <p>~ 3.18.(화)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>서류 합격 발표</h3>
            <p>2025.3.21(금)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>면접</h3>
            <p>2025.3.24(월)</p>
            <p>~3.26(수)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>최종합격 발표</h3>
            <p>2025.3.28(금)</p>
          </div>
        </div>
      </div>

      <div className={styles['recruit-apply']}>
        <h1>CRA와 함께 성장하고 싶다면</h1>
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf5uTQbDr7i9WjPfI61hMJ_PqDS1Of_fZRNpD8MRzlvnYFsKA/closedform">
          <button className={styles['button-style']}>지원하기</button>
        </Link>
      </div>
    </div>
  );
}
