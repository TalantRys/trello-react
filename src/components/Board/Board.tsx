import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../state/cards/cardSlice";
import type { RootState } from "../../state/store";
import type { CardType } from "../../types";
import AuthorForm from "../AuthorForm/AuthorForm";
import Card from "../Card/Card";
import CardInfo from "../CardInfo/CardInfo";
import Column from "../Column/Column";
import Comments from "../Comments/Comments";
import Modal from "../Modal/Modal";
import Button from "../ui/Button/Button";
import styles from "./board.module.scss";

function Board() {
  const dispatch = useDispatch();

  const author = useSelector((state: RootState) => state.author);
  const cards = useSelector((state: RootState) => state.cards);
  const columns = useSelector((state: RootState) => state.columns);
  const [showModal, setShowModal] = useState(() =>
    author === "" ? true : false,
  );
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const currentCard: CardType | undefined = cards.find(
    (card) => card.id === currentCardId,
  );

  const handleAuthorFormSubmit = () => {
    setShowModal(false);
  };

  const handleCardClick = (id: number) => {
    setCurrentCardId(id);
    setShowCardModal(true);
  };

  return (
    <>
      <Modal
        title="Enter your name"
        isOpen={showModal}
        onClose={() =>
          !author ? alert("Please enter your name") : setShowModal(!showModal)
        }
      >
        <AuthorForm onSubmit={handleAuthorFormSubmit} />
      </Modal>

      <Modal
        title={
          currentCard
            ? columns.find((column) => column.id === currentCard.columnId)
                ?.title
            : ""
        }
        isOpen={showCardModal}
        onClose={() => setShowCardModal(!showCardModal)}
        menuItems={[
          {
            name: "Delete card",
            onClick: () => {
              dispatch(deleteCard(currentCardId as number));
              setShowCardModal(!showCardModal);
            },
          },
        ]}
      >
        {!!currentCard && (
          <>
            <CardInfo card={currentCard} />
            <Comments cardId={currentCard.id} author={author} />
          </>
        )}
      </Modal>

      <div className={styles.board}>
        <div className={classNames(styles.board__container, "container")}>
          <div className={styles.board__header}>
            {!!author && (
              <h2 className={styles.board__title}>Welcome, {author}</h2>
            )}

            <Button disabled={showModal} onClick={() => setShowModal(true)}>
              {author ? "Change author" : "Add author"}
            </Button>
          </div>

          <div className={styles.board__items}>
            {columns.map((column) => (
              <Column key={column.id} column={column}>
                {cards.map(
                  (card) =>
                    card.columnId === column.id && (
                      <Card
                        key={card.id}
                        card={card}
                        onCardClick={() => handleCardClick(card.id)}
                      />
                    ),
                )}
              </Column>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
