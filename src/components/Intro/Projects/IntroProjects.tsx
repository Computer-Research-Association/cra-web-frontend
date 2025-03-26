import { Link } from 'react-router-dom';
import CRAProject from './CRAProject.tsx';
import styles from './IntroProjects.module.css';
import project from '~/data/project.json';
import onGoingProject from '~/data/onGoingProject.json';

function IntroProjects() {
  return (
    <div className={styles.project}>
      <p className={styles.ProjectBanner}>CRA 프로젝트 소개</p>

      {project.data.map((project, index) => (
        <CRAProject key={index} {...project} />
      ))}

      <p className={styles.ProjectBanner}>현재 진행 중인 프로젝트</p>

      {onGoingProject.data.map((project, index) => (
        <CRAProject key={index} {...project} />
      ))}

      <div className={styles.ProjectMore}>
        <p className={styles.ProjectMoreComment}>
          CRA의 더 많은 프로젝트가 궁금하다면?
        </p>
        <Link to="/project" className={styles.ProjectMoreLink}>
          프로젝트 더보기
        </Link>
      </div>
    </div>
  );
}

export default IntroProjects;
