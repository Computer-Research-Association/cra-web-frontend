import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { deleteHavrutaBoards } from '~/api/havruta/havrutaBoard';
import styles from './HavrutaBoardDelete.module.css';

function HavrutaBoardDelete() {
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const havrutaBoardId = Number(id);

  const mutation = useMutation({
    mutationFn: (havrutaBoardId: number) => deleteHavrutaBoards(havrutaBoardId),
    onSuccess: async () => {
      await navigate('/havruta');
    },
    onError: (error) => {
      console.error('하브루타 게시물 삭제 실패: ', error);
    },
  });

  const HandleDelete = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      mutation.mutate(havrutaBoardId);
    }
  };

  return (
    <div className={styles['delete-button']} onClick={HandleDelete}>
      <MdDeleteOutline size={24} />
    </div>
  );
}

export default HavrutaBoardDelete;
