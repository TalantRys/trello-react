import type { FunctionComponent } from "react";
import type { CardType } from "../../types";
import Comment from "./Comment";
import styles from './Comments.module.scss';

interface CommentListProps {
  comments: CardType["comments"];
  onChangeComment: CallableFunction;
  onDeleteComment: CallableFunction;
}

const CommentList: FunctionComponent<CommentListProps> = ({
  comments,
  onChangeComment,
  onDeleteComment,
}) => {
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
