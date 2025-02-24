import { useNavigate } from 'react-router-dom';
import HeaderIntro from '~/components/Header/Intro-Header/HeaderIntro';
import IntroTop from '~/components/Intro/Top/IntroTop';
import IntroCRA from '~/components/Intro/CRA/IntroCRA';
import IntroHistory from '~/components/Intro/History/IntroHistory';
import IntroNetwork from '~/components/Intro/Network/IntroNetwork';
import IntroProjects from '~/components/Intro/Projects/IntroProjects';
import styles from './IntroPage.module.css';

export default function IntroPage() {
  const navigate = useNavigate();

  const goToRecruit = () => {
    void navigate('/recruit');
  };

  return (
    <div className={styles.container}>
      <HeaderIntro />
      <IntroTop />
      <IntroCRA />
      <IntroHistory />
      <IntroNetwork />
      <IntroProjects />

      <button className={styles.goToRecruitBtn} onClick={goToRecruit}>
        지원하러 가기
      </button>
    </div>
  );
}
