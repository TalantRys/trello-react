import classNames from "classnames";
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "success" | "danger" | null;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
};

export default function Button({
  children,
  variant,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "button",
        styles.button,
        !!variant && styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
