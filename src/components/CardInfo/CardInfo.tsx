import { useState } from "react";
import type { CardType } from "../../types";
import styles from "./CardInfo.module.scss";
import EditButton from "../ui/EditButton/EditButton";
import Textarea from "../ui/Textarea/Textarea";
import { handleEnterKey } from "../../functions/keyDown";
import Button from "../ui/Button/Button";
import classNames from "classnames";

type CardInfoProps = {
  card: CardType | undefined;
  onCardEdit: CallableFunction;
};

export default function CardInfo({ card, onCardEdit }: CardInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [cardDesc, setCardDesc] = useState(card?.description || "");

  const editCard = (isEdit = !isEditing) => {
    setIsEditing(isEdit);
    if (isEdit) return;

    onCardEdit({ ...card, description: cardDesc });
  };

  return (
    <div className={styles.modalCard}>
      <h2 className={classNames("modal-title", styles.modalTitle)}>
        {card?.title}
      </h2>
      <div className={styles.modalDesc}>
        {!cardDesc && !isEditing ? (
          <Button onClick={() => editCard(true)}>Add description</Button>
        ) : (
          <div className={styles.modalDescHeader}>
            <h3 className={styles.modalDescTitle}>Description:</h3>
            {!isEditing && (
              <EditButton
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              ></EditButton>
            )}
          </div>
        )}
        {isEditing ? (
          <div className={styles.modalDescContent}>
            <Textarea
              maxLength={1000}
              value={cardDesc}
              placeholder="Write description of card"
              onChange={(e) => setCardDesc(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, editCard)}
            />
            <Button active={isEditing} onClick={() => editCard()}>
              Save
            </Button>
          </div>
        ) : (
          <div className={styles.modalDescContent}>
            <p>{cardDesc}</p>
          </div>
        )}
      </div>
      <span className={styles.author}>By {card?.author}</span>
    </div>
  );
}
