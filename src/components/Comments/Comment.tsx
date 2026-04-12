import { useState, type FunctionComponent } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { CommentType } from "../../types";
import Button from "../ui/Button/Button";
import Form from "../ui/Form/Form";
import Textarea from "../ui/Textarea/Textarea";
import styles from "./Comments.module.scss";

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

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    onChange({
      ...comment,
      text: data.commentText,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    commentContent = (
      <Form
        defaultValues={{
          commentText: comment.text,
        }}
        mode={"onChange"}
        onSubmit={handleSubmit}
      >
        <Textarea
          name={"commentText"}
          options={{ required: "Please enter comment" }}
          autoFocus
          maxLength={1000}
          onBlur={(e) => e.target.value.trim() === "" && setIsEditing(false)}
        />
        <Button variant="success">Save</Button>
      </Form>
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
