import { useQuery } from '@tanstack/react-query';
import { Comment } from '~/models/Comment.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getCommentsByBoardId } from '~/api/comment.ts';
import CommentItem from '~/components/Comment/Item/CommentItem.tsx';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

export default function CommentList({ id }: { id: number }) {
  const commentsQuery = useQuery<Comment[]>({
    queryKey: QUERY_KEY.comment.commentsById(id),
    queryFn: async () => getCommentsByBoardId(id),
  });

  let content;

  if (commentsQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (commentsQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (commentsQuery.isSuccess) {
    content = commentsQuery.data.map((comment) => (
      <div key={comment.id}>
        <CommentItem
          key={comment.id}
          comment={comment}
          isRoot={true}
          commentsQuery={
            commentsQuery.data.find((c) => c.id === comment.id) || null
          }
        />
        {comment.commentList.map((childComment) => {
          return (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              isRoot={false}
              commentsQuery={childComment}
            />
          );
        })}
      </div>
    ));
  }

  return <div>{content}</div>;
}
