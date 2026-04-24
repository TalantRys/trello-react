import classNames from "classnames";
import { type FunctionComponent } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../state/cards/cardSlice";
import type { CommentType } from "../../types";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import styles from "./Comments.module.scss";

type CommentsProps = {
  cardId: number;
  author: string;
};

const Comments: FunctionComponent<CommentsProps> = ({ cardId, author }) => {
  const dispatch = useAppDispatch();

  function handleAddComment(text: string) {
    dispatch(
      addComment({
        id: Date.now(),
        cardId,
        text,
        author,
      }),
    );
  }

  function handleChangeComment(comment: CommentType) {
    dispatch(editComment({ cardId, ...comment }));
  }

  function handleDeleteComment(commentId: number) {
    dispatch(deleteComment({ cardId, commentId }));
  }

  return (
    <div className={styles.Comments}>
      <div className={styles.Comments_Header}>
        <h2 className={classNames("modal-title")}>Comments:</h2>
        <AddComment onAddComment={handleAddComment} />
      </div>

      <CommentList
        cardId={cardId}
        onChangeComment={handleChangeComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default Comments;
