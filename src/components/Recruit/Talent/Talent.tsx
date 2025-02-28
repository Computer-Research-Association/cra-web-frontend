import React from 'react';
import styles from './Talent.module.css';

const clubContents = [
  {
    number: '01',
    content: (
      <>
        다른 사람과 협력하며 공동의 목표를 <br />
        이루고 서로 배우고 발전하며{' '}
        <span style={{ color: 'var(--color-primary)' }}>함께 성장</span>
        하고 싶은 사람
      </>
    ),
  },
  {
    number: '02',
    content: (
      <>
        어떤 문제든 두려움 없이 극복하려는 의지를 가지고
        <br />
        새로운 기회를 탐구하는 용기와{' '}
        <span style={{ color: 'var(--color-primary)' }}>도전 의식</span>을 지닌
        사람
      </>
    ),
  },
  {
    number: '03',
    content: (
      <>
        익숙하지 않은 새로운 지식을 접할 때도 적극적으로 받아들이고
        <br />
        실수를 통해 성장하며 자신의 능력을 확장하려고{' '}
        <span style={{ color: 'var(--color-primary)' }}>노력</span>하는 사람
      </>
    ),
  },
  {
    number: '04',
    content: (
      <>
        자신이 맡은 일을 끝까지 책임지고 완수하며 <br />
        팀과 조직을 위해 기여하고자 하는{' '}
        <span style={{ color: 'var(--color-primary)' }}>책임감</span>이 강한
        사람
      </>
    ),
  },
];

function Talent({
  recruitTalentRef,
  isVisible,
}: {
  recruitTalentRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
}) {
  return (
    <div className={styles['recruit-talent']}>
      <h2
        ref={recruitTalentRef}
        className={`${styles['recruit-title']} ${isVisible ? styles['animate'] : ''}`}
      >
        이런 사람과 함께 하고 싶어요
      </h2>

      <div ref={recruitTalentRef} className={styles['recruit-talentDetail']}>
        {clubContents.map((item, index) => (
          <div key={index}>
            <span className={styles['number']}>{item.number}</span>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Talent;
