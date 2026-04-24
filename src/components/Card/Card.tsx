import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteCard, editCard } from "../../state/cards/cardSlice";
import type { CardType } from "../../types";
import Button from "../ui/Button/Button";
import EditButton from "../ui/EditButton/EditButton";
import Form from "../ui/Form/Form";
import Textarea from "../ui/Textarea/Textarea";
import styles from "./card.module.scss";
import commentIcon from "/comment-dots-solid-full.svg?url";

type CardProps = {
  card: CardType;
  onCardClick: CallableFunction;
};

function Card({ card, onCardClick }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(editCard({ ...card, title: data.title }));
    setIsEditing(false);
  };

  return !isEditing ? (
    <div className={styles.card} onClick={() => onCardClick(card.id)}>
      <div className={styles.card__header}>
        <span className={styles.card__title}>{card.title}</span>
        <EditButton
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        ></EditButton>
      </div>
      {!!card.description && (
        <div className={styles.card__content}>{card.description}</div>
      )}
      <div className={styles.card__footer}>
        <span className={styles.card__author}>By: {card.author}</span>

        {!!card.comments.length && (
          <span className={styles.card__icon}>
            <img src={commentIcon} alt="comment-icon" width={20} height={20} />
            {card.comments.length}
          </span>
        )}
      </div>
    </div>
  ) : (
    <Form
      defaultValues={{
        title: card.title,
      }}
      mode={"onChange"}
      className={styles.card}
      onSubmit={handleSubmit}
    >
      <Textarea
        name="title"
        autoFocus
        maxLength={100}
        options={{
          required: "Please enter title of card",
          maxLength: { value: 100, message: "Title must be less than 100" },
        }}
      />
      <div className={styles.card__buttons}>
        <Button variant="success" type="submit">
          Save
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => dispatch(deleteCard(card.id))}
        >
          Delete card
        </Button>
      </div>
    </Form>
  );
}
export default Card;
