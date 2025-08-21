import styles from './Calender.module.css';
import recruitDate from '~/data/recruit-date.json';

type RecruitTimelineItem = {
  title: string;
  start?: string;
  end?: string;
  date?: string;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${year}.${month}.${day}(${weekday})`;
}

function Calender() {
  const timeline = (recruitDate.timeline as RecruitTimelineItem[]) || [];

  return (
    <div className={styles['recruit-calender']}>
      <h2>모집 일정</h2>
      <div className={styles['calender-line']}>
        {timeline.map((item) => (
          <div key={item.title} className={styles['calender-box']}>
            <h3>{item.title}</h3>
            {item.start && item.end ? (
              <>
                <p>{formatDate(item.start)}</p>
                <p>~ {formatDate(item.end)}</p>
              </>
            ) : item.date ? (
              <p>{formatDate(item.date)}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
