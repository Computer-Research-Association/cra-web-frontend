import { useState } from 'react';
import { Comment } from '~/models/Comment.ts';
import CommentDelete from '~/components/Comment/Delete/CommentDelete.tsx';
import CommentEdit from '~/components/Comment/Edit/CommentEdit.tsx';
import CommentWrite from '~/components/Comment/Write/CommentWrite.tsx';
import Divider from '~/components/Common/Divider.tsx';
import HeightSpacer from '~/components/Common/HeightSpacer.tsx';
import WidthSpacer from '~/components/Common/WidthSpacer.tsx';
import { dateFormat } from '~/utils/dateForm.ts';
import styles from './CommentItem.module.css';
import { useUserStore } from '~/store/userStore';

export default function CommentItem({
  comment,
  isRoot,
}: {
  comment: Comment;
  isRoot: Boolean;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <Divider />
      <HeightSpacer space={20} />
      <div className={styles['item-container']}>
        <WidthSpacer space={14} />
        {!isRoot && <WidthSpacer space={46} />}
        {isEditing ? (
          <CommentEdit
            id={comment.id as number}
            content={comment.content} // 기존 내용을 prop으로 전달
            onClose={() => setIsEditing(false)} // 수정 완료 후 수정 모드를 종료
          />
        ) : (
          <div className={styles['item-content']}>
            <div className={styles['comment-user']}>
              <div className={styles['comment-profile-image']} />
              <div className={styles['comment-id']}>
                {comment.resUserDetailDto.name}
              </div>
            </div>
            <div className={styles['comment-content']}>{comment.content}</div>

            <div className={styles['comment-footer']}>
              <div>{dateFormat(comment.createdAt)}</div>
              <div
                onClick={() => setIsEditing(true)}
                className={styles['delete-button']}
              >
                수정
              </div>
              {isRoot && (
                <div
                  onClick={() => {
                    setShowReplyForm((prev) => !prev);
                    setIsClicked((prev) => !prev);
                  }}
                  className={
                    isClicked
                      ? styles['comment-reply2']
                      : styles['comment-reply']
                  }
                >
                  답글 작성
                </div>
              )}
              <CommentDelete id={comment.id as number} />
            </div>
            {showReplyForm && <CommentWrite parentId={comment.id} />}
          </div>
        )}
      </div>
      <HeightSpacer space={14} />
    </div>
  );
}
