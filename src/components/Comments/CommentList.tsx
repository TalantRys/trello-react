import type { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { CommentType } from "../../types";
import Comment from "./Comment";
import styles from "./Comments.module.scss";

interface CommentListProps {
  cardId: number;
  onChangeComment: CallableFunction;
  onDeleteComment: CallableFunction;
}

const CommentList: FunctionComponent<CommentListProps> = ({
  cardId,
  onChangeComment,
  onDeleteComment,
}) => {
  const comments: CommentType[] = useSelector((state: RootState) => {
    const card = state.cards.find((card) => card.id === cardId);
    return card?.comments || [];
  });

  return (
    !!comments.length && (
      <ul className={styles.Comments_List}>
        {comments.toReversed().map((comment) => (
          <li key={comment.id} className={styles.Comments_Item}>
            <Comment
              comment={comment}
              onChange={onChangeComment}
              onDelete={onDeleteComment}
            />
          </li>
        ))}
      </ul>
    )
  );
};

export default CommentList;
