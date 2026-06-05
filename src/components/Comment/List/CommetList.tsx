import CommentItem from '~/components/Comment/Item/CommentItem.tsx';
import { Board } from '~/models/Board';

export default function CommentList({ board }: { board: Board }) {
  const commentsQuery = board.resListCommentDtos ?? [];

  const content = commentsQuery.map((comment) => (
    <div key={comment.id}>
      <CommentItem comment={comment} isRoot={true} />
      {comment.commentList.map((childComment) => (
        <CommentItem
          key={childComment.id}
          comment={childComment}
          isRoot={false}
        />
      ))}
    </div>
  ));

  return <div>{content}</div>;
}
