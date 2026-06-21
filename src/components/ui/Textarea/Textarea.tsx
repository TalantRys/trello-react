import classNames from "classnames";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
  type TextareaHTMLAttributes,
} from "react";
import {
  useFormContext,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { isEnterKey } from "../../../functions/keyDown";
import styles from "./Textarea.module.scss";

interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
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

export default function Textarea({
  name,
  options,
  className,
  ...props
}: TextareaProps) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, ...rest }: UseFormRegisterReturn = register(name, {
    ...options,
    validate: (v) => v.trim().length > 0 || "Field cannot be empty",
  });

  const value = watch(name);

  useImperativeHandle(ref, () => textAreaRef.current);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  return (
    <div className={styles.field}>
      <textarea
        ref={textAreaRef}
        className={classNames("textarea", styles.textarea, className)}
        placeholder={props.placeholder ?? "Write name of new card"}
        {...rest}
        onKeyDown={
          props.onKeyDown
            ? props.onKeyDown
            : (e: KeyboardEvent<HTMLTextAreaElement>) => {
                if (isEnterKey(e)) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }
        }
        {...props}
      ></textarea>

      {errors[name] && (
        <span className={styles.error}>{errors[name]?.message as string}</span>
      )}
    </div>
  );
}
