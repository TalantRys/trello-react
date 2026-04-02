import { type PropsWithChildren } from "react";
import styles from "./EditButton.module.scss";
import Button, { type ButtonProps } from "../Button/Button";

export default function EditButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
}
