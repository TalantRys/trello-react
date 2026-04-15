import classNames from "classnames";
import { useState, type MouseEvent, type PropsWithChildren } from "react";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { handleEnterKey } from "../../functions/keyDown";
import type { ColumnType } from "../../types";
import Button from "../ui/Button/Button";
import Form from "../ui/Form/Form";
import Textarea from "../ui/Textarea/Textarea";
import styles from "./column.module.scss";

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
  const [isAddingCard, setIsAddingCard] = useState(false);

  function saveNewTitle(isEdit: boolean) {
    setIsEditTitle(isEdit);

    const newTitle = { ...column, title: editTitle };
    onColumnChange(newTitle);
  }

  const onNewCardSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.title === "") return;

    const newCard = {
      id: Date.now(),
      columnId: column.id,
      title: data.title,
      comments: [],
    };
    onAddCard(newCard);
    setIsAddingCard(false);
  };

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
          variant={isEditTitle ? "success" : null}
          className={styles.button}
          onClick={() => saveNewTitle(!isEditTitle)}
        >
          {!isEditTitle ? "Edit" : "Save"}
        </Button>
      </div>
      <div className={styles.column__cards}>
        {children}

        {isAddingCard && (
          <Form
            id={"add-new-card"}
            defaultValues={{ title: "" }}
            onSubmit={onNewCardSubmit}
          >
            <Textarea
              autoFocus
              maxLength={100}
              name="title"
              options={{
                maxLength: {
                  value: 100,
                  message: "Title must be less than 100",
                },
              }}
            />
          </Form>
        )}
      </div>
      <div className={styles.column__footer}>
        <Button
          form={"add-new-card"}
          type={"button"}
          variant={isAddingCard ? "success" : null}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.form?.requestSubmit();
            setIsAddingCard(!isAddingCard);
          }}
        >
          Add Card
        </Button>
      </div>
    </div>
  );
}
