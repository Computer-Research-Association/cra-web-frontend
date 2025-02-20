import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { deleteComments } from '~/api/comment.ts';
import styles from './CommentDelete.module.css';

export default function CommentDelete({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      console.log('삭제 요청 ID:', id); // 여기서 id가 제대로 전달되는지 확인
      return deleteComments(id);
    },
    onSuccess: () => {
      console.log('삭제 성공:', id); // 삭제가 성공했을 때 id 확인
      QUERY_KEY.comment.commentsById(id);
      void queryClient.invalidateQueries(); // invalidateQueries 호출
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className={styles['delete-button']} onClick={handleDelete}>
      삭제
    </div>
  );
}
