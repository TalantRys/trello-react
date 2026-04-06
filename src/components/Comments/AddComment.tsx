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
    const comment = text.replace(/(\r\n|\n|\r){2,}/g, "\n\n").trim();
    if (isEdit || comment === "") return;

    setText("");
    onAddComment(comment);
    setIsEditing(isEdit);
  };

  return (
    <>
      <Textarea
        maxLength={1000}
        placeholder="Write a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={(e) => e.target.value.trim() === "" && setIsEditing(false)}
        onKeyDown={(e) => handleEnterKey(e, handleAdd)}
      />

      {isEditing && (
        <Button variant="success" onClick={() => handleAdd(false)}>
          Save
        </Button>
      )}
    </>
  );
};

export default AddComment;
