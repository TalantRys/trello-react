import classNames from "classnames";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCard } from "../../state/cards/cardSlice";
import type { CardType } from "../../types";
import Button from "../ui/Button/Button";
import EditButton from "../ui/EditButton/EditButton";
import Form from "../ui/Form/Form";
import Textarea from "../ui/Textarea/Textarea";
import styles from "./CardInfo.module.scss";

type CardInfoProps = {
  card: CardType;
};

export default function CardInfo({ card }: CardInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const dispatch = useDispatch();

  const handleDescSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(editCard({ ...card, description: data.cardDesc }));
    setIsEditing(false);
  };

  const handleTitleSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(editCard({ ...card, title: data.cardTitle }));
    setIsEditingTitle(false);
  };

  return (
    <div className={styles.modalCard}>
      <div className={styles.modalTitleWrapper}>
        {isEditingTitle ? (
          <Form
            defaultValues={{
              cardTitle: card?.title,
            }}
            mode={"onChange"}
            onSubmit={handleTitleSubmit}
            style={{ width: "100%" }}
          >
            <Textarea
              name={"cardTitle"}
              autoFocus
              maxLength={100}
              placeholder="Enter card title"
              options={{ required: "Please enter card title" }}
            />
            <Button variant="success">Save</Button>
          </Form>
        ) : (
          <>
            <h2 className={classNames("modal-title", styles.modalTitle)}>
              {card?.title}
            </h2>
            <EditButton
              onClick={() => {
                setIsEditingTitle(true);
              }}
            ></EditButton>
          </>
        )}
      </div>

      <div className={styles.modalDesc}>
        {!card?.description && !isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Add description</Button>
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
          <Form
            defaultValues={{
              cardDesc: card?.description,
            }}
            onSubmit={handleDescSubmit}
            className={styles.modalDescContent}
          >
            <Textarea
              name={"cardDesc"}
              autoFocus
              maxLength={1000}
              placeholder="Write description of card"
            />
            <Button variant="success">Save</Button>
          </Form>
        ) : (
          card?.description && (
            <div className={styles.modalDescContent}>
              <p>{card?.description}</p>
            </div>
          )
        )}
      </div>
      <span className={styles.author}>By {card?.author}</span>
    </div>
  );
}
