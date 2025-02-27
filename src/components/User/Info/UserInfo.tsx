import { useNavigate } from 'react-router-dom';
import { useUserStore } from '~/store/userStore';
import styles from '../UserPage.module.css';
import { MdOutlineMail } from 'react-icons/md';
import { MdOutlineSchool } from 'react-icons/md';
import { LuUser } from 'react-icons/lu';
import { FaGithub } from 'react-icons/fa6';
import { FaRegComments } from 'react-icons/fa';

function UserInfo() {
  const navigate = useNavigate();
  const { name, email, studentId, term, githubId, imgUrl, greetingMessage } =
    useUserStore();

  const handleChangeImage = () => {
    void navigate(`/user/${name}/image/upload`);
  };

  const handleUpdate = () => {
    void navigate(`/user/${name}/edit`);
  };

  const handleDelete = () => {
    void navigate(`/user/${name}/delete`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <div className={styles.profile}>
          <img src={imgUrl} className={styles.preview} loading="lazy" />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.info_container}>
        <div className={styles.info_row}>
          <div className={styles.info}>
            <p>
              <MdOutlineMail className={styles.infoIcon} />
              이메일{' '}
            </p>
            {email}
          </div>
          <div className={styles.info}>
            <p>
              <MdOutlineSchool className={styles.infoIcon} />
              학번{' '}
            </p>
            {studentId}
          </div>
        </div>
        <div className={styles.info_row}>
          <div className={styles.info}>
            <p>
              <LuUser className={styles.infoIcon} />
              기수{' '}
            </p>
            {term}
          </div>
          <div className={styles.info}>
            <p>
              <FaGithub className={styles.infoIcon} />
              GitHub{' '}
            </p>
            {githubId}
          </div>
        </div>
        <div className={styles.info_row}>
          <div className={styles.info_full}>
            <p>
              <FaRegComments className={styles.infoIcon} />
              나의 한마디{' '}
            </p>
            <div className={styles.info_content}>
              &quot; {greetingMessage} &quot;
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleChangeImage}>프로필 사진 변경</button>
        <button className={styles.edit} onClick={handleUpdate}>
          유저 정보 수정
        </button>
        <button className={styles.delete} onClick={handleDelete}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
