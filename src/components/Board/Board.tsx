import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";

function Board() {
  return (
    <div className={styles.board}>
      <div className={classNames(styles.board__container, "container")}>
        <div className={styles.board__items}>
          <Column title="TODO" />
          <Column title="In progress" />
          <Column title="Processing" />
          <Column title="Done" />
        </div>
      </div>
    </div>
  );
}

export default Board;
