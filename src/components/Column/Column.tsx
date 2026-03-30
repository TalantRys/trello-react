import classNames from "classnames";
import type { ColumnType } from "../../types";
import styles from "./column.module.scss";
import { useState, type KeyboardEvent, type PropsWithChildren } from "react";

type ColumnProps = {
  column: ColumnType;
  onColumnChange: CallableFunction;
  onAddCard: CallableFunction;
};

export default function Column({
  children,
  column,
  onColumnChange,
  onAddCard,
}: PropsWithChildren<ColumnProps>) {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  function handleKeydown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: CallableFunction,
  ) {
    if (event.key === "Enter") {
      callback(false);
    }
  }

  function saveNewTitle(isEdit: boolean) {
    setIsEditTitle(isEdit);

    const newTitle = { ...column, title: editTitle };
    onColumnChange(newTitle);
  }

  function addNewCard(isAdd: boolean) {
    setIsAddingCard(isAdd);
    if (newCardTitle === "") return;

    const newCard = {
      id: Date.now(),
      columnId: column.id,
      title: newCardTitle,
    };
    onAddCard(newCard);
    setNewCardTitle("");
  }

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <input
            className={classNames(styles.column__input, "input")}
            type="text"
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => handleKeydown(e, saveNewTitle)}
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
      <div className={styles.column__cards}>
        {children}

        {isAddingCard && (
          <textarea
            className={classNames("textarea", styles["column__new-card"])}
            placeholder="Write name of new card"
            value={newCardTitle}
            autoFocus
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => handleKeydown(e, addNewCard)}
          ></textarea>
        )}
      </div>
      <div className={styles.column__footer}>
        <button
          className={classNames("button", styles["column__card-button"], {
            [styles.active]: isAddingCard,
          })}
          onClick={() => addNewCard(!isAddingCard)}
        >
          Add Card
        </button>
      </div>
    </div>
  );
}
