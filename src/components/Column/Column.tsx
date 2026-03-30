import type { ColumnType } from "../../types";
import styles from "./column.module.scss";
import { useState, type ChangeEvent, type PropsWithChildren } from "react";

type ColumnProps = {
  column: ColumnType;
  onColumnChange: CallableFunction;
};

export default function Column({
  children,
  column,
  onColumnChange,
}: PropsWithChildren<ColumnProps>) {
  const [isEditTitle, setIsEditTitle] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = { ...column, title: event.target.value };
    onColumnChange(newTitle);
  }

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <input type="text" value={column.title} onChange={handleChange} />
        ) : (
          <p className={styles.column__title}>{column.title}</p>
        )}
        <button type="button" onClick={() => setIsEditTitle(!isEditTitle)}>
          {!isEditTitle ? "Edit" : "X"}
        </button>
      </div>
      <div className={styles.column__cards}>{children}</div>
    </div>
  );
}
