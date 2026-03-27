import styles from "./card.module.scss";

interface CardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
  onCardClick: CallableFunction;
}

function Card({ id, title, author, description, onCardClick }: CardProps) {
  return (
    <div className={styles.card} onClick={() => onCardClick(id)}>
      <div className={styles.card__header}>
        <span className={styles.card__title}>{title}</span>
      </div>
      <div className={styles.card__content}>{description}</div>
      <div className={styles.card__footer}>
        <span className={styles.card__author}>Author: {author}</span>
      </div>
    </div>
  );
}
export default Card;
