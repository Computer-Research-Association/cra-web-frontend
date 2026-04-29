import { useState } from 'react';
import { Project } from '~/models/Project.ts';
import ProjectModal from '~/components/Modal/Project/ProjectModal.tsx';
import styles from './ProjectItem.module.css';

export default function ProjectItem({ project }: { project: Project }) {
  const [modalIsOpen, setModalOpen] = useState(false);
  console.log(Object.keys(project));

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className={styles['project-block']} onClick={openModal}>
        {/*<div className={styles['picture-background']}>
          <img src={project.imageUrl} className={styles['project-picture']} />
        </div>*/}
        <div className={styles['title']}>
          {project.serviceName}
          <img
            src="/src/assets/images/project/OpenPageArrow.png"
            width="13"
            height="13"
          />
        </div>
        <div className={styles['content']}>{project.content}</div>
        <div className={styles['memberContainer']}>
          {project.members.map((member, index) => (
            <button key={index} className={styles['memberButton']}>
              {member}
            </button>
          ))}
        </div>
      </div>
      {modalIsOpen && (
        <ProjectModal projectId={project.id!} closeModal={closeModal} />
      )}
    </>
  );
}
