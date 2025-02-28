import CR from '~/assets/images/RecruitImage/CR.png?format=webp&as=srcset';
import A from '~/assets/images/RecruitImage/A.png?format=webp&as=srcset';
import SCRETCH from '~/assets/images/RecruitImage/scretch.png?format=webp&as=srcset';
import CONTENT from '~/assets/images/RecruitImage/content.png?format=webp&as=srcset';
import styles from './Cra.module.css';

//---------------------디지인 시도----------------------------
function Cra({ isExpanding }: { isExpanding: boolean }) {
  return (
    <div className={styles['recruit-main1']}>
      <div className={styles['recruit-banner1']}>
        <img
          srcSet={CR}
          className={`${styles['cr-image']} ${isExpanding ? styles['cr-expand'] : ''}`}
        />
        <img
          srcSet={SCRETCH}
          className={`${styles['scratch-image']} ${isExpanding ? styles['scratch-expand'] : ''}`}
        />
        <img
          srcSet={A}
          className={`${styles['a-image']} ${isExpanding ? styles['a-expand'] : ''}`}
        />
        <img
          srcSet={CONTENT}
          className={`${styles['content-image']} ${isExpanding ? styles['content-expand'] : ''}`}
        />
      </div>
    </div>
  );
}

export default Cra;
