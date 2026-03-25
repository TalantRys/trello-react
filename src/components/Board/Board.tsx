import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";
import { useState } from "react";

interface CardProps {
  title: string;
  author: string;
  description?: string;
}

let cards: Array<CardProps> = [
  {
    title: "",
    author: "Billy",
  },
  {
    title: "",
    author: "Carl",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    title: "",
    author: "Robert",
  },
];

cards = cards.map((card, i) => ({ ...card, title: `Card ${i + 1}` }));

const columnsArr: { id: number; title: string }[] = [
  { id: 0, title: "TODO" },
  { id: 1, title: "In progress" },
  { id: 2, title: "Processing" },
  { id: 3, title: "Done" },
];

function Board() {
  const [columns, setColumns] = useState(columnsArr);

  return (
    <div className={styles.board}>
      <div className={classNames(styles.board__container, "container")}>
        <div className={styles.board__items}>
          {columns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              cards={cards}
              columns={columns}
              onSetColumns={setColumns}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
