import { useState } from 'react';
import { Project } from '~/models/Project.ts';
import ProjectModal from '~/components/Modal/Project/ProjectModal.tsx';
import styles from './ProjectItem.module.css';

export default function ProjectItem({ project }: { project: Project }) {
  const [modalIsOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className={styles['project-block']} onClick={openModal}>
        <div className={styles['project-picture']}>
          <img src={project.imageUrl} className={styles['project-picture']} />
        </div>
        <div className={styles['title']}>{project.serviceName}</div>
        <div className={styles['content']}>{project.members.join(', ')}</div>
      </div>
      {modalIsOpen && (
        <ProjectModal projectId={project.id!} closeModal={closeModal} />
      )}
    </>
  );
}
