import { useState, type FunctionComponent } from "react";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import Button from "../ui/Button/Button";
import Form from "../ui/Form/Form";
import Textarea from "../ui/Textarea/Textarea";

interface AddCommentProps {
  onAddComment: CallableFunction;
}

const AddComment: FunctionComponent<AddCommentProps> = ({ onAddComment }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd: SubmitHandler<FieldValues> = (data) => {
    onAddComment(data.comment);
    setIsEditing(!isEditing);
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <Form
      defaultValues={{
        comment: "",
      }}
      onSubmit={handleAdd}
    >
      <Textarea
        name={"comment"}
        maxLength={1000}
        placeholder="Write a comment"
        onFocus={() => setIsEditing(true)}
        onBlur={(e) => e.target.value.trim() === "" && setIsEditing(false)}
      />

      {isEditing && <Button variant="success">Save</Button>}
    </Form>
  );
};

export default AddComment;
