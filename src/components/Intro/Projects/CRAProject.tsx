import styles from './IntroProjects.module.css';

const CRAProject = ({
  image,
  title,
  description,
  stack,
}: {
  image: string;
  title: string;
  description: string[];
  stack: string;
}) => (
  <div className={styles.ProjectSection}>
    <img srcSet={image} className={styles.ProjectImage} />
    <p className={styles.ProjectTitle}>{title}</p>
    <div className={styles.ProjectContext}>
      {description.map((desc, index) => (
        <p key={index}>{desc}</p>
      ))}
      <p className={styles.ProjectStack}>개발스택: {stack}</p>
    </div>
  </div>
);

export default CRAProject;
