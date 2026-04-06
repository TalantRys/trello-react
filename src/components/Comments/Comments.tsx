import { type FunctionComponent } from "react";
import type { CommentType } from "../../types";
import AddComment from "./AddComment";
import classNames from "classnames";
import CommentList from "./CommentList";
import styles from './Comments.module.scss';

type CommentsProps = {
  author: string;
  comments: CommentType[];
  onCardEdit: CallableFunction;
};

const Comments: FunctionComponent<CommentsProps> = ({
  author,
  comments = [],
  onCardEdit,
}) => {
  
  function handleAddComment(text: string) {
    onCardEdit([
      ...comments,
      {
        id: Date.now(),
        text: text,
        author: author,
      },
    ]);
  }

  function handleChangeComment(nextComment: CommentType) {
    onCardEdit(
      comments.map((c) => (c.id === nextComment.id ? nextComment : c)),
    );
  }

  function handleDeleteComment(commentId: number) {
    onCardEdit(comments.filter((c) => c.id !== commentId));
  }

  return (
    <div className={styles.Comments}>
      <div className={styles.Comments_Header}>
        <h2 className={classNames("modal-title")}>Comments:</h2>
        <AddComment onAddComment={handleAddComment} />
      </div>

      <CommentList
        comments={comments}
        onChangeComment={handleChangeComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default Comments;
