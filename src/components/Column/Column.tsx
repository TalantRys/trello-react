import classNames from "classnames";
import type { ColumnType } from "../../types";
import styles from "./column.module.scss";
import { useState, type PropsWithChildren } from "react";
import Textarea from "../ui/Textarea/Textarea";
import { handleEnterKey } from "../../functions/keyDown";
import Button from "../ui/Button/Button";

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
            maxLength={50}
            className={classNames(styles.column__input, "input")}
            type="text"
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, saveNewTitle)}
          />
        ) : (
          <p className={styles.column__title}>{editTitle}</p>
        )}
        <Button
          active={isEditTitle}
          className={styles.button}
          onClick={() => saveNewTitle(!isEditTitle)}
        >
          {!isEditTitle ? "Edit" : "Save"}
        </Button>
      </div>
      <div className={styles.column__cards}>
        {children}

        {isAddingCard && (
          <Textarea
            maxLength={100}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e, addNewCard)}
          />
        )}
      </div>
      <div className={styles.column__footer}>
        <Button active={isAddingCard} onClick={() => addNewCard(!isAddingCard)}>
          Add Card
        </Button>
      </div>
    </div>
  );
}
