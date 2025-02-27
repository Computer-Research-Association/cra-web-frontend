import CommentItem from '~/components/Comment/Item/CommentItem.tsx';
// import LoadingSpinner from '~/components/Common/LoadingSpinner';
import { Board } from '~/models/Board';

export default function CommentList({ board }: { board: Board }) {
  // const commentsQuery = useQuery<Comment[]>({
  //   queryKey: QUERY_KEY.comment.commentsById(id),
  //   queryFn: async () => getCommentsByBoardId(id),
  // });
  const commentsQuery = board.resListCommentDtos;
  let content;

  // if (commentsQuery.isLoading) {
  //   content = <LoadingSpinner />;
  if (!commentsQuery) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else {
    content = commentsQuery.map((comment) => (
      <div key={comment.id}>
        <CommentItem key={comment.id} comment={comment} isRoot={true} />
        {comment.commentList.map((childComment) => {
          return (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              isRoot={false}
            />
          );
        })}
      </div>
    ));
  }

  return <div>{content}</div>;
}
