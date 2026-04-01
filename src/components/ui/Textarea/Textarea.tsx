import classNames from "classnames";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import styles from "./Textarea.module.scss";

type TextareaProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
};

export default function Textarea({
  value,
  onChange,
  onKeyDown,
  className,
}: TextareaProps) {
  return (
    <textarea
      className={classNames("textarea", styles.textarea, className)}
      placeholder="Write name of new card"
      value={value}
      autoFocus
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></textarea>
  );
}
