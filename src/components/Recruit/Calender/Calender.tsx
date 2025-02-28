import styles from './Calender.module.css';

function Calender() {
  return (
    <div className={styles['recruit-calender']}>
      <h2>모집 일정</h2>
      <div className={styles['calender-line']}>
        <div className={styles['calender-box']}>
          <h3>서류 접수</h3>
          <p>2025.2.26.(수)</p>
          <p>~ 3.12.(수)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>면접 일정 안내</h3>
          <p>2025.3.12(수)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>코딩 테스트 / 면접</h3>
          <p>2025.3.13(목)</p>
          <p>~3.19(수)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>최종합격 발표</h3>
          <p>2025.3.20(목)</p>
        </div>
      </div>
    </div>
  );
}

export default Calender;
