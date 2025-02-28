import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '~/api/project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import Modal from 'react-modal';
import styles from '../Project/ProjectModal.module.css';

const ProjectModal = ({
  projectId,
  closeModal,
}: {
  projectId: number;
  closeModal: () => void;
}) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY.project.projectById(projectId),
    queryFn: async () => getProjectById(projectId),
  });

  if (isLoading) {
    return (
      <Modal isOpen onRequestClose={closeModal}>
        Loading...
      </Modal>
    );
  }

  if (isError || !project) {
    return (
      <Modal isOpen onRequestClose={closeModal}>
        <div>에러가 발생했습니다.</div>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-header']}>
          {project.serviceName}
          <a
            href={project.gitHubUrl}
            rel="none"
            className={styles['url-button']}
          >
            URL
          </a>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['image-box']}>
            <img
              src={project.imageUrl}
              className={styles['image']}
              loading="lazy"
            />
          </div>
          <div className={styles['description']}>
            <div className={styles['content-description']}>프로젝트 설명</div>
            <div>{project.content}</div>
          </div>
        </div>
        <div className={styles['modal-footer']}>
          <button onClick={closeModal} className={styles['close-button']}>
            X
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectModal;
