import classNames from "classnames";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addName } from "../../state/author/authorSlice";
import type { RootState } from "../../state/store";
import Form from "../ui/Form/Form";
import Input from "../ui/Input/Input";
import styles from "./AuthorForm.module.scss";

type AuthorFormProps = {
  onSubmit: () => void;
};

export default function AuthorForm({ onSubmit }: AuthorFormProps) {
  const author = useSelector((state: RootState) => state.author);
  const dispatch = useDispatch();

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addName(data.name));
    onSubmit();
  };

  return (
    <Form defaultValues={{ name: author }} onSubmit={handleFormSubmit}>
      <Input
        name={"name"}
        options={{ required: "Please enter your name", maxLength: 50 }}
        maxLength={50}
        type="text"
        autoFocus
        placeholder="Your name"
      />
      <button className={classNames(styles.submit, "button")} type="submit">
        Submit
      </button>
    </Form>
  );
}
