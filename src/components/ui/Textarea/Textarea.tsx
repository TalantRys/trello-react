import classNames from "classnames";
import { useEffect, useRef, type TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string | undefined;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
};

export default function Textarea({
  value,
  className,
  ...props
}: TextareaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      className={classNames("textarea", styles.textarea, className)}
      placeholder={props.placeholder ?? "Write name of new card"}
      value={value}
      {...props}
    ></textarea>
  );
}
