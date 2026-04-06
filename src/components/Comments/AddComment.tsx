import { useState, type FunctionComponent } from "react";
import Textarea from "../ui/Textarea/Textarea";
import Button from "../ui/Button/Button";
import { handleEnterKey } from "../../functions/keyDown";

interface AddCommentProps {
  onAddComment: CallableFunction;
}

const AddComment: FunctionComponent<AddCommentProps> = ({ onAddComment }) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = (isEdit: boolean) => {
    if (isEdit) return;

    setText("");
    onAddComment(text.replace(/(\r\n|\n|\r){2,}/g, "\n\n"));
    setIsEditing(isEdit);
  };

  return (
    <>
      <Textarea
        maxLength={1000}
        autoFocus={false}
        placeholder="Write a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={(e) => e.target.value.trim() === "" && setIsEditing(false)}
        onKeyDown={(e) => text.trim() !== "" && handleEnterKey(e, handleAdd)}
      />

      {isEditing && (
        <Button active={true} onClick={() => handleAdd(false)}>
          Save
        </Button>
      )}
    </>
  );
};

export default AddComment;
