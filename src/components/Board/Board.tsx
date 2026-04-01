import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";
import { useState } from "react";
import ModalProvider from "../ModalProvider/ModalProvider";
import CardInfo from "../CardInfo/CardInfo";
import AuthorForm from "../AuthorForm/AuthorForm";
import { cardsArr, columnsArr } from "../../data/data";
import Card from "../Card/Card";
import type { CardType, ColumnType } from "../../types";

function Board() {
  const [author, setAuthor] = useState("");
  const [cards, setCards] = useState(cardsArr);
  const [columns, setColumns] = useState(columnsArr);
  const [showModal, setShowModal] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const currentCard = cards.find((card) => card.id === currentCardId);

  const handleAuthorFormSubmit = (name: string) => {
    setAuthor(name);
    setShowModal(false);
  };

  const handleCardClick = (id: number) => {
    setCurrentCardId(id);
    setShowCardModal(true);
  };

  const handleColumnChange = (updatedColumn: ColumnType) => {
    setColumns(
      columns.map((column) =>
        column.id === updatedColumn.id ? updatedColumn : column,
      ),
    );
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
      <ModalProvider
        isOpen={showModal}
        onClose={() =>
          !author ? alert("Please enter your name") : setShowModal(!showModal)
        }
      >
        <AuthorForm stateValue={author} onSubmit={handleAuthorFormSubmit} />
      </ModalProvider>

      <ModalProvider
        isOpen={showCardModal}
        onClose={() => setShowCardModal(!showCardModal)}
      >
        <CardInfo card={currentCard} />
      </ModalProvider>

      <div className={styles.board}>
        <div className={classNames(styles.board__container, "container")}>
          <div className={styles.board__header}>
            {!!author && <h2>Welcome, {author}</h2>}

            <button
              className="button"
              disabled={showModal}
              onClick={() => setShowModal(true)}
            >
              {author ? "Change author" : "Add author"}
            </button>
          </div>

          <div className={styles.board__items}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onColumnChange={handleColumnChange}
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
