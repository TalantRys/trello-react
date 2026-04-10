import classNames from "classnames";
import styles from "./AuthorForm.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";

type AuthorFormProps = {
  stateValue: string;
  onSubmit: (name: string) => void;
};

type Inputs = {
  name: string;
};

export default function AuthorForm({ stateValue, onSubmit }: AuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: stateValue,
    },
  });

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit(data.name);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.field}>
        <input
          {...register("name", { required: true, maxLength: 50 })}
          className="input"
          type="text"
          autoFocus
          placeholder="Your name"
        />
        {errors.name?.type === "required" && (
          <span className={styles.error}>Please enter your name</span>
        )}
        {errors.name?.type === "maxLength" && (
          <span className={styles.error}>Name must be less 50 length</span>
        )}
      </div>
      <button className={classNames(styles.submit, "button")} type="submit">
        Submit
      </button>
    </form>
  );
}
