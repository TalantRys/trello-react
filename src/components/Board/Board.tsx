import classNames from "classnames";
import styles from "./board.module.scss";
import Card from "../Card/Card";

function Board() {
  return (
    <div className={styles.board}>
      <div className={classNames(styles.board__container, "container")}>
        <div className={styles.board__items}>
          <Card title="TODO" />
          <Card title="In progress" />
          <Card title="Processing" />
          <Card title="Done" />
        </div>
      </div>
    </div>
  );
}

export default Board;
