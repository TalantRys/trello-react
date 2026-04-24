import type { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/redux";
import { selectComments } from "../../state/cards/cardSlice";
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
  const comments = useAppSelector((state) => selectComments(state, cardId));

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
