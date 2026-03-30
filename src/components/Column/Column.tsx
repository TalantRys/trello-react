import styles from "./column.module.scss";
import { useState, type ChangeEvent, type PropsWithChildren } from "react";

interface ColumnProps {
  title: string;
  columns: { id: number; title: string }[];
  onSetColumns: CallableFunction;
}

export default function Column({
  children,
  title,
  columns,
  onSetColumns,
}: PropsWithChildren<ColumnProps>) {
  const [isEditTitle, setIsEditTitle] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value;
    const newColumns = columns.map((column) => {
      if (column.title === title) {
        return {
          ...column,
          title: newTitle,
        };
      }

      return column;
    });

    onSetColumns(newColumns);
  }
  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <input type="text" value={title} onChange={handleChange} />
        ) : (
          <p className={styles.column__title}>{title}</p>
        )}
        <button type="button" onClick={() => setIsEditTitle(!isEditTitle)}>
          {!isEditTitle ? "Edit" : "X"}
        </button>
      </div>
      <div className={styles.column__cards}>{children}</div>
    </div>
  );
}
