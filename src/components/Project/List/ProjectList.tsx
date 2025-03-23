import { Project } from '~/models/Project.ts';
import ProjectItem from '~/components/Project/Item/ProjectItem.tsx';
import styles from './ProjectList.module.css';
import Pagination from '~/components/Pagination/Pagination';

interface ProjectListProps {
  projectsQuery: Project[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

export default function ProjectList({
  projectsQuery,
  totalPages,
  currentPage,
  onPageChange,
}: ProjectListProps) {
  const renderBoardContent = () => {
    if (projectsQuery != null) {
      return projectsQuery
        .filter((project) => project.id !== undefined)
        .map((project, index) => (
          <div key={`board-${project.id}`}>
            <div className={styles['board-wrapper']}>
              <ProjectItem project={project} />
            </div>
            {index < projectsQuery.length - 1 && (
              <div className={styles.divider}></div>
            )}
          </div>
        ));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로젝트</h2>
      <div className={styles.boardList}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles['spacer']}></div>
        <div className={styles.pagination}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
