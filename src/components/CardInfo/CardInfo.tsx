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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [cardDesc, setCardDesc] = useState(card?.description || "");
  const [cardTitle, setCardTitle] = useState(card?.title || "");

  const editCardDesc = (isEdit = !isEditing) => {
    setIsEditing(isEdit);
    if (isEdit) return;

    onCardEdit({ ...card, description: cardDesc });
  };

  const editCardTitle = (isEdit = !isEditingTitle) => {
    if (!cardTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setIsEditingTitle(isEdit);
    if (isEdit) return;

    onCardEdit({ ...card, title: cardTitle });
  };

  return (
    <div className={styles.modalCard}>
      <div className={styles.modalTitleWrapper}>
        {isEditingTitle ? (
          <>
            <Textarea
              maxLength={100}
              value={cardTitle}
              placeholder="Enter card title"
              onChange={(e) => setCardTitle(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, editCardTitle)}
            />
            <Button
              variant="success"
              disabled={!cardTitle.trim()}
              onClick={() => editCardTitle()}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <h2 className={classNames("modal-title", styles.modalTitle)}>
              {card?.title}
            </h2>
            <EditButton
              onClick={() => {
                setIsEditingTitle(!isEditingTitle);
              }}
            ></EditButton>
          </>
        )}
      </div>

      <div className={styles.modalDesc}>
        {!cardDesc && !isEditing ? (
          <Button onClick={() => editCardDesc(true)}>Add description</Button>
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
              onKeyDown={(e) => handleEnterKey(e, editCardDesc)}
            />
            <Button variant="success" onClick={() => editCardDesc()}>
              Save
            </Button>
          </div>
        ) : (
          cardDesc && (
            <div className={styles.modalDescContent}>
              <p>{cardDesc}</p>
            </div>
          )
        )}
      </div>
      <span className={styles.author}>By {card?.author}</span>
    </div>
  );
}
