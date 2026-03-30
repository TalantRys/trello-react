import type { CardType } from "../../types";
import styles from "./CardInfo.module.scss";

export default function CardInfo({ card }: { card: CardType | undefined }) {
  return (
    <div className={styles["modal-card"]}>
      <h2 className="modal-title">{card?.title}</h2>
      {!!card?.description && <p>{card?.description}</p>}
      <span className={styles.author}>By {card?.author}</span>
    </div>
  );
}
