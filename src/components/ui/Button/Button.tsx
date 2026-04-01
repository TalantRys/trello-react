import classNames from "classnames";
import { type PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  active?: boolean;
  variant?: "danger" | null;
  onClick: () => void;
  className?:
    | classNames.Value
    | classNames.Mapping
    | classNames.ArgumentArray
    | classNames.ReadonlyArgumentArray
    | null;
};

export default function Button({
  children,
  active = false,
  variant,
  onClick,
  className,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "button",
        styles.button,
        variant && styles[variant],
        { [styles.active]: active },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
