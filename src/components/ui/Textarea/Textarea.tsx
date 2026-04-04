import classNames from "classnames";
import {
  useEffect,
  useRef,
  type ChangeEventHandler,
  type TextareaHTMLAttributes,
} from "react";
import styles from "./Textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
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
  className,
  placeholder = "Write name of new card",
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
      placeholder={placeholder}
      value={value}
      autoFocus={props.autoFocus ?? true}
      onChange={(e) => {
        onChange(e);
      }}
      {...props}
    ></textarea>
  );
}
