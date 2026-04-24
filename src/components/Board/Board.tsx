import classNames from "classnames";
import { useState } from "react";
import { cardsArr } from "../../data/data";
import type { CardType, CommentType } from "../../types";
import AuthorForm from "../AuthorForm/AuthorForm";
import Card from "../Card/Card";
import CardInfo from "../CardInfo/CardInfo";
import Column from "../Column/Column";
import Comments from "../Comments/Comments";
import Modal from "../Modal/Modal";
import styles from "./board.module.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import Button from "../ui/Button/Button";
import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";

function Board() {
  const [author, setAuthor] = useLocalStorage("author", "");
  const [cards, setCards] = useLocalStorage<CardType[]>("cards", cardsArr);
  const columns = useSelector((state: RootState) => state.columns);
  const [showModal, setShowModal] = useState(() =>
    author === "" ? true : false,
  );
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const currentCard: CardType | undefined = cards.find(
    (card) => card.id === currentCardId,
  );

  const handleAuthorFormSubmit = (name: string) => {
    setAuthor(name);
    setShowModal(false);
  };

  const handleCardClick = (id: number) => {
    setCurrentCardId(id);
    setShowCardModal(true);
  };

  const handleAddCard = (newCard: CardType) => {
    setCards([...cards, { ...newCard, author }]);
  };

  const handleEditCard = (changedCard: CardType) => {
    setCards(
      cards.map((card) => (card.id === changedCard.id ? changedCard : card)),
    );
  };

  const handleCardDelete = (cardId: number) => {
    setCards(cards.filter((card) => card.id !== cardId));
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
        <AuthorForm stateValue={author} onSubmit={handleAuthorFormSubmit} />
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
              handleCardDelete(currentCardId as number);
              setShowCardModal(!showCardModal);
            },
          },
        ]}
      >
        {!!currentCard && (
          <>
            <CardInfo card={currentCard} onCardEdit={handleEditCard} />
            <Comments
              author={author}
              comments={currentCard.comments}
              onCardEdit={(comments: CommentType[]) =>
                handleEditCard({ ...currentCard, comments })
              }
            />
          </>
        )}
      </Modal>

      <div className={styles.board}>
        <div className={classNames(styles.board__container, "container")}>
          <div className={styles.board__header}>
            {!!author && (
              <h2 className={styles.board__title}>Welcome, {author}</h2>
            )}

            <Button
              disabled={showModal}
              onClick={() => setShowModal(true)}
            >
              {author ? "Change author" : "Add author"}
            </Button>
          </div>

          <div className={styles.board__items}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddCard={handleAddCard}
              >
                {cards.map(
                  (card) =>
                    card.columnId === column.id && (
                      <Card
                        key={card.id}
                        card={card}
                        onCardClick={() => handleCardClick(card.id)}
                        onCardEdit={handleEditCard}
                        onCardDelete={() => handleCardDelete(card.id)}
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
