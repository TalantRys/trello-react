import type { CommentType } from "../../types";
import { useState, type FunctionComponent } from "react";
import Textarea from "../ui/Textarea/Textarea";
import Button from "../ui/Button/Button";
import styles from "./Comments.module.scss";
import { handleEnterKey } from "../../functions/keyDown";

interface CommentProps {
  comment: CommentType;
  onChange: CallableFunction;
  onDelete: CallableFunction;
}

const Comment: FunctionComponent<CommentProps> = ({
  comment,
  onChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let commentContent;

  if (isEditing) {
    commentContent = (
      <>
        <Textarea
          autoFocus
          maxLength={1000}
          value={comment.text}
          onChange={(e) => {
            onChange({
              ...comment,
              text: e.target.value,
            });
          }}
          onBlur={(e) => e.target.value.trim() === "" && setIsEditing(false)}
          onKeyDown={(e) =>
            comment.text.trim() !== "" && handleEnterKey(e, setIsEditing)
          }
        />
        <Button variant="success" onClick={() => setIsEditing(false)}>
          Save
        </Button>
      </>
    );
  } else {
    commentContent = (
      <>
        <p className={styles.Comment_Text}>{comment.text}</p>
        <div className={styles.Comment_Buttons}>
          <Button
            className={styles.Comment_Button}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            className={styles.Comment_Button}
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <h4 className={styles.Comment_Author}>{comment.author}</h4>
      {commentContent}
    </>
  );
};

export default Comment;
