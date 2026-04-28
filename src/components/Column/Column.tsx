import { useState, type MouseEvent, type PropsWithChildren } from "react";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authorSelectors } from "../../state/ducks/author";
import { cardActions } from "../../state/ducks/cards";
import { columnActions } from "../../state/ducks/columns";
import type { ColumnType } from "../../types";
import Button from "../ui/Button/Button";
import Form from "../ui/Form/Form";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import styles from "./column.module.scss";

type ColumnProps = {
  column: ColumnType;
};

export default function Column({
  children,
  column,
}: PropsWithChildren<ColumnProps>) {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const author = useAppSelector(authorSelectors.selectAuthor);
  const dispatch = useAppDispatch();

  const saveNewTitle: SubmitHandler<FieldValues> = (data) => {
    dispatch(columnActions.editColumnTitle(column.id, data.columnTitle));
    setIsEditTitle(false);
  };

  const onNewCardSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(cardActions.addCard(column.id, data.title, author));
    setIsAddingCard(false);
  };

  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <Form
            id="edit-column-title"
            defaultValues={{ columnTitle: column.title }}
            onSubmit={saveNewTitle}
          >
            <Input
              name={"columnTitle"}
              options={{ required: "Please enter column title", maxLength: 50 }}
              maxLength={50}
              className={styles.column__input}
              type="text"
              autoFocus
            />
          </Form>
        ) : (
          <p className={styles.column__title}>{column.title}</p>
        )}
        <Button
          form={"edit-column-title"}
          type={"button"}
          variant={isEditTitle ? "success" : null}
          className={styles.button}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.form?.requestSubmit();
            setIsEditTitle(!isEditTitle);
          }}
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
