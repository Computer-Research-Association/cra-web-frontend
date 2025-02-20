import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteBoards } from '~/api/board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './BoardDelete.module.css';

export default function BoardDelete({
  id,
  category,
}: {
  id: number;
  category: number;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBoards(id),
    onSuccess: async () => {
      await navigate(-1);
      // 게시글 목록 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.board.boardsCount(category),
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.board.boardsCount(category),
      });
    },
    onError: (error) => {
      console.error('게시글 삭제 실패:', error);
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={styles['delete-button']} onClick={handleDelete}>
      <MdDeleteOutline size={24} />
    </div>
  );
}
