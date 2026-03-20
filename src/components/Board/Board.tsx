import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";

const cards = new Array(3).fill(0).map((_, i) => ({ title: `Card ${i + 1}` }));

function Board() {
  return (
    <div className={styles.board}>
      <div className={classNames(styles.board__container, "container")}>
        <div className={styles.board__items}>
          <Column title="TODO" cards={cards} />
          <Column title="In progress" cards={cards} />
          <Column title="Processing" cards={cards} />
          <Column title="Done" cards={cards} />
        </div>
      </div>
    </div>
  );
}

export default Board;
