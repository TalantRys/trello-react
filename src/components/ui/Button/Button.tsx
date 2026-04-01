import classNames from "classnames";
import { type PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  active?: boolean;
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
  onClick,
  className,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "button",
        styles.button,
        { [styles.active]: active },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
