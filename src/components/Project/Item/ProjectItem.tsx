import { useNavigate } from 'react-router-dom';
import { Project } from '~/models/Project.ts';
import styles from './ProjectItem.module.css';

export default function ProjectItem({ project }: { project: Project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate(`/project/view/${project.id}`);
  };

  return (
    <div className={styles['project-block']} onClick={handleClick}>
      <div className={styles['semester']}>{project.semester}</div>
      <div className={styles['title']}>
        {project.serviceName}
        <img
          src="/src/assets/images/project/OpenPageArrow.png"
          width="13"
          height="13"
        />
      </div>
      {project.tags && project.tags.length > 0 && (
        <div className={styles['tagContainer']}>
          {project.tags.map((tag) => (
            <span key={tag.id} className={styles['tagPill']}>
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <div className={styles['memberContainer']}>
        {project.members.map((member, index) => (
          <button key={index} className={styles['memberButton']}>
            {member}
          </button>
        ))}
      </div>
    </div>
  );
}
