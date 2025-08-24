import { RefObject } from 'react';
import styles from './Banner.module.css';
import recruitLink from '~/data/recruit-link.json';
import recruitDate from '~/data/recruit-date.json';

const LINK: string = recruitLink['recruit-google-form'];

function toLocalDate(dateStr: string, endOfDay = false) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return endOfDay
    ? new Date(y, m - 1, d, 23, 59, 59, 999)
    : new Date(y, m - 1, d, 0, 0, 0, 0);
}

const RECRUIT_START_DATE = toLocalDate(recruitDate.applicationPeriod.start);
const RECRUIT_END_DATE = toLocalDate(recruitDate.applicationPeriod.end, true);

interface RecruitButtonProps {
  titleRef: RefObject<HTMLDivElement>;
}

function RecruitButton({ titleRef }: RecruitButtonProps) {
  const now = new Date();
  const isRecruitAvailable = now >= RECRUIT_START_DATE && now <= RECRUIT_END_DATE;

  if (isRecruitAvailable) {
    return (
      <div ref={titleRef} className={styles['recruit-apply1']}>
        <button className={styles['button-style']} onClick={() => window.open(LINK, '_blank')}> CRA 리크루팅 지원하기</button>
      </div>
    );
  } else {
    return (  
      <div ref={titleRef} className={styles['recruit-apply1']}>
        <button className={styles['button-style']}>지원 기간이 종료되었습니다</button>
      </div>
    );
  }
}

export default RecruitButton;
