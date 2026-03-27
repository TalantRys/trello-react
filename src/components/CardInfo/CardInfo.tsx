import styles from "./CardInfo.module.scss";

interface CardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

export default function CardInfo({ card }: { card: CardProps | undefined }) {
  return (
    <div className={styles["modal-card"]}>
      <h2 className={styles.title}>{card?.title}</h2>
      {card?.description !== undefined && <p>{card?.description}</p>}
      <span className={styles.author}>By {card?.author}</span>
    </div>
  );
}
