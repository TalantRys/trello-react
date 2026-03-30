import type { CardType } from "../../types";
import styles from "./card.module.scss";

type CardProps = {
  card: CardType;
  onCardClick: CallableFunction;
};

function Card({ card, onCardClick }: CardProps) {
  return (
    <div className={styles.card} onClick={() => onCardClick(card.id)}>
      <div className={styles.card__header}>
        <span className={styles.card__title}>{card.title}</span>
      </div>
      {!!card.description && (
        <div className={styles.card__content}>{card.description}</div>
      )}
      <div className={styles.card__footer}>
        <span className={styles.card__author}>Author: {card.author}</span>
      </div>
    </div>
  );
}
export default Card;
