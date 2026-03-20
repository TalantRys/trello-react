import styles from "./column.module.scss";
import Card from "../Card/Card";

export default function Column(params: { title: string }) {
  const cards = new Array(3).fill(0);

  return (
    <div className={styles.column}>
      <p className={styles.column__title}>{params.title}</p>
      <div className={styles.column__cards}>
        {cards.map((_, i) => (
          <Card key={i} title={`Card ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
