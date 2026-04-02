import classNames from "classnames";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import styles from "./Textarea.module.scss";

type TextareaProps = {
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
  placeholder?: string;
};

export default function Textarea({
  value,
  onChange,
  onKeyDown,
  className,
  placeholder = "Write name of new card",
}: TextareaProps) {
  return (
    <textarea
      className={classNames("textarea", styles.textarea, className)}
      placeholder={placeholder}
      value={value}
      autoFocus
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></textarea>
  );
}
