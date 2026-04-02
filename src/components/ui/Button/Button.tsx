import classNames from "classnames";
import { type PropsWithChildren } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  active?: boolean;
  variant?: "danger" | null;
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | (() => void)
    | undefined;
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
        !!variant && styles[variant],
        { [styles.active]: active },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
