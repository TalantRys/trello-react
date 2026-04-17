import classNames from "classnames";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import Form from "../ui/Form/Form";
import Input from "../ui/Input/Input";
import styles from "./AuthorForm.module.scss";

type AuthorFormProps = {
  stateValue: string;
  onSubmit: (name: string) => void;
};

export default function AuthorForm({ stateValue, onSubmit }: AuthorFormProps) {
  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data.name);
  };

  return (
    <Form defaultValues={{ name: stateValue }} onSubmit={handleFormSubmit}>
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
