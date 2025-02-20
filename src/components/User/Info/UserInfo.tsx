import { useNavigate } from 'react-router-dom';
import { useUserStore } from '~/store/userStore';
import styles from '../UserPage.module.css';

function UserInfo() {
  const navigate = useNavigate();
  const { name, email, studentId, term, githubId, imgUrl } = useUserStore();

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
      <div className={styles.title}>마이페이지</div>
      <div className={styles.profile}>
        <div>
          <img src={imgUrl} className={styles.preview} />
        </div>
      </div>
      <div className={styles.name}>
        {/* <p>이름 </p> */}
        {name}
      </div>
      <div className={styles.info}>
        <p>이메일 </p>
        {email}
      </div>
      <div className={styles.info}>
        <p>학번 </p>
        {studentId}
      </div>
      <div className={styles.info}>
        <p>기수 </p>
        {term}
      </div>
      <div className={styles.info}>
        <p>GitHub </p>
        {githubId}
      </div>
      <div className={styles.buttons}>
        <button className={styles.profile} onClick={handleChangeImage}>
          프로필 사진 변경
        </button>
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
