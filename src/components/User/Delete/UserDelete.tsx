import { useUserStore } from '~/store/userStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '~/api/user';
import { useAuthStore } from '~/store/authStore';
import styles from '../UserPage.module.css';

function UserDelete() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { name, resetUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      resetUser();
      void logout();
      void navigate(`/main`);
    },
    onError: () => {
      console.log('회원 탈퇴 실패');
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말로 탈퇴하나요?');
    if (confirmDelete) {
      mutation.mutate();
    }
  };

  const handleCancle = () => {
    void navigate(`/user/${name}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>회원 탈퇴</div>
      <div className={styles.deleting}>{name}님의 선택은???</div>
      <div className={styles.buttons}>
        <button className={styles.realDelete} onClick={handleDelete}>
          진짜로 탈퇴하기
        </button>
        <button className={styles.onemorechange} onClick={handleCancle}>
          다시 한번 생각해보기
        </button>
      </div>
    </div>
  );
}

export default UserDelete;
