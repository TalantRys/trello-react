import { useState } from "react";
import type { CardType } from "../../types";
import styles from "./card.module.scss";
import Textarea from "../ui/Textarea/Textarea";
import { handleEnterKey } from "../../functions/keyDown";
import Button from "../ui/Button/Button";
import EditButton from "../ui/EditButton/EditButton";

type CardProps = {
  card: CardType;
  onCardClick: CallableFunction;
  onCardEdit: CallableFunction;
  onCardDelete: CallableFunction;
};

function Card({ card, onCardClick, onCardEdit, onCardDelete }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);

  const editCard = (isEdit: boolean) => {
    setIsEditing(isEdit);
    if (isEdit) return;

    onCardEdit({ ...card, title: cardTitle });
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
        <span className={styles.card__author}>Author: {card.author}</span>
      </div>
    </div>
  ) : (
    <div className={styles.card}>
      <Textarea
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e, editCard)}
      />
      <div className={styles.card__buttons}>
        <Button active={isEditing} onClick={() => editCard(!isEditing)}>
          Save
        </Button>
        <Button variant="danger" onClick={() => onCardDelete()}>
          Delete card
        </Button>
      </div>
    </div>
  );
}
export default Card;
