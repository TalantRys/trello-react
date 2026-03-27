import styles from "./column.module.scss";
import Card from "../Card/Card";
import { useState, type ChangeEvent } from "react";

interface CardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

interface ColumnProps {
  title: string;
  cards: Array<CardProps>;
  columns: { id: number; title: string }[];
  onSetColumns: CallableFunction;
  onCardClick: CallableFunction;
}

export default function Column({
  title,
  cards,
  columns,
  onSetColumns,
  onCardClick,
}: ColumnProps) {
  const [isEditTitle, setIsEditTitle] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value;
    const newColumns = columns.map((column) => {
      if (column.title === title) {
        return {
          ...column,
          title: newTitle,
        };
      }

      return column;
    });

    onSetColumns(newColumns);
  }
  return (
    <div className={styles.column}>
      <div className={styles.column__header}>
        {isEditTitle ? (
          <input type="text" value={title} onChange={handleChange} />
        ) : (
          <p className={styles.column__title}>{title}</p>
        )}
        <button type="button" onClick={() => setIsEditTitle(!isEditTitle)}>
          {!isEditTitle ? "Edit" : "X"}
        </button>
      </div>
      <div className={styles.column__cards}>
        {cards.map((card, i) => (
          <Card
            key={i}
            id={card.id}
            title={card.title}
            author={card.author}
            description={card.description}
            onCardClick={() => onCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
