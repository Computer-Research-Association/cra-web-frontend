import { useState } from 'react';
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(projectsQuery.flatMap((p) => p.tags?.map((t) => t.name) ?? [])),
  );

  const filtered = selectedTag
    ? projectsQuery.filter((p) => p.tags?.some((t) => t.name === selectedTag))
    : projectsQuery;

  const renderBoardContent = () => {
    if (filtered != null) {
      return filtered
        .filter((project) => project.id !== undefined)
        .map((project, index) => (
          <div key={`board-${project.id}`}>
            <div className={styles['board-wrapper']}>
              <ProjectItem project={project} />
            </div>
            {index < filtered.length - 1 && (
              <div className={styles.divider}></div>
            )}
          </div>
        ));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로젝트</h2>
      <div className={styles.tagFilterContainer}>
        <button
          className={`${styles.tagFilterButton} ${selectedTag === null ? styles.tagFilterButtonActive : ''}`}
          onClick={() => setSelectedTag(null)}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
            <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
            <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" />
            <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" />
            <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
          </svg>
          All Projects
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagFilterButton} ${selectedTag === tag ? styles.tagFilterButtonActive : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
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
