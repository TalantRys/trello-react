import { useState } from "react";
import type { CardType } from "../../types";
import styles from "./card.module.scss";
import Textarea from "../ui/Textarea/Textarea";
import { handleEnterKey } from "../../functions/keyDown";
import Button from "../ui/Button/Button";

type CardProps = {
  card: CardType;
  onCardClick: CallableFunction;
  onCardEdit: CallableFunction;
};

function Card({ card, onCardClick, onCardEdit }: CardProps) {
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
        <button
          className={styles.card__button}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
        ></button>
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
      <Button active={isEditing} onClick={() => editCard(!isEditing)}>
        Save
      </Button>
    </div>
  );
}
export default Card;
