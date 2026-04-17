import classNames from "classnames";
import { type InputHTMLAttributes } from "react";
import {
  useFormContext,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "name"
> {
  name: string;
  options?: RegisterOptions;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
}

export default function Input({
  name,
  options,
  className,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const rest: UseFormRegisterReturn = register(name, {
    ...options,
    validate: (v) => v.trim().length > 0 || "Field cannot be empty",
  });

  return (
    <div className={styles.field}>
      <input
        className={classNames("input", styles.input, className)}
        placeholder={props.placeholder ?? "Your name"}
        {...rest}
        {...props}
      />

      {errors[name] && (
        <span className={styles.error}>{errors[name]?.message as string}</span>
      )}
    </div>
  );
}
