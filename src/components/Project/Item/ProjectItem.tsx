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
      <div className={styles['accentBar']} />

      <div className={styles['topRow']}>
        <span className={styles['semester']}>{project.semester}</span>
        <button className={styles['arrowBtn']}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </button>
      </div>

      <div className={styles['title']}>{project.serviceName}</div>

      <div className={styles['bottomSection']}>
        {project.tags && project.tags.length > 0 && (
          <>
            <div className={styles['tagContainer']}>
              {project.tags.map((tag) => (
                <span key={tag.id} className={styles['tagPill']}>
                  {tag.name}
                </span>
              ))}
            </div>
            <div className={styles['divider']} />
          </>
        )}
        <div className={styles['memberContainer']}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
          </svg>
          {project.members.map((member, index) => (
            <span key={index} className={styles['memberChip']}>
              {member}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
