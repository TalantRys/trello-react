import styles from "./card.module.scss";

interface CardProps {
  title: string;
  author: string;
  description?: string;
}

function Card({ title, author, description }: CardProps) {
  return (
    <div className={styles.card}>
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
