import styles from "./column.module.scss";
import Card from "../Card/Card";

interface ColumnProps {
  title: string;
  cards: Array<{ title: string }>;
}

export default function Column({ title, cards }: ColumnProps) {
  return (
    <div className={styles.column}>
      <p className={styles.column__title}>{title}</p>
      <div className={styles.column__cards}>
        {cards.map((card, i) => (
          <Card key={i} title={card.title} />
        ))}
      </div>
    </div>
  );
}
