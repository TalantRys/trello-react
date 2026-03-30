import classNames from "classnames";
import type { ColumnType } from "../../types";
import styles from "./column.module.scss";
import { useState, type KeyboardEvent, type PropsWithChildren } from "react";

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
  const [editTitle, setEditTitle] = useState(column.title);

  function handleKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      saveNewTitle(false);
    }
  }

  function saveNewTitle(isEdit: boolean) {
    setIsEditTitle(isEdit);

    const newTitle = { ...column, title: editTitle };
    onColumnChange(newTitle);
  }

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <input
            className={classNames(styles.column__input, "input")}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeydown}
          />
        ) : (
          <p className={styles.column__title}>{editTitle}</p>
        )}
        <button
          className={classNames("button", styles.column__button, {
            [styles.active]: isEditTitle,
          })}
          type="button"
          onClick={() => saveNewTitle(!isEditTitle)}
        >
          {!isEditTitle ? "Edit" : "Save"}
        </button>
      </div>
      <div className={styles.column__cards}>{children}</div>
    </div>
  );
}
