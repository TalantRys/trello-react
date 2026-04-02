import classNames from "classnames";
import styles from "./AuthorForm.module.scss";

type AuthorFormProps = {
  stateValue: string;
  onSubmit: (name: string) => void;
};

export default function AuthorForm({ stateValue, onSubmit }: AuthorFormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    } else {
      onSubmit(name);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2 className={classNames(styles.title, "modal-title")}>Enter your name</h2> */}
      <input
        id="name"
        name="name"
        className="input"
        type="text"
        autoFocus
        defaultValue={stateValue}
        placeholder="Your name"
        maxLength={50}
      />
      <button className={classNames(styles.submit, "button")} type="submit">
        Submit
      </button>
    </form>
  );
}
