import classNames from "classnames";
import styles from "./board.module.scss";
console.log(styles);

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
function Card({ title }) {
  return (
    <div className={classNames("card", styles.board__item)}>
      <span>{title}</span>
    </div>
  );
}
export default Board;
