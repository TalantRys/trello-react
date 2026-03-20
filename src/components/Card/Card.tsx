import classNames from "classnames";
import styles from "./card.module.scss";

interface CardProps {
  title: string;
}
function Card({ title }: CardProps) {
  return (
    <div className={styles.card}>
      <span>{title}</span>
    </div>
  );
}
export default Card;
