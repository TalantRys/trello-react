import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";
import { useState } from "react";
import ModalProvider from "../ModalProvider/ModalProvider";
import CardInfo from "../CardInfo/CardInfo";
import AuthorForm from "../AuthorForm/AuthorForm";
import { cards, columnsArr } from "../../data/data";
import Card from "../Card/Card";

function Board() {
  const [author, setAuthor] = useState("");
  // const [cards, setCards] = useState(cardsArr);
  const [columns, setColumns] = useState(columnsArr);
  const [showModal, setShowModal] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const handleAuthorFormSubmit = (name: string) => {
    setAuthor(name);
    setShowModal(false);
  };

  const handleCardClick = (id: number) => {
    setCurrentCardId(id);
    setShowCardModal(true);
  };

  const currentCard = cards.find((card) => card.id === currentCardId);

  return (
    <>
      <ModalProvider
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
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
                title={column.title}
                columns={columns}
                onSetColumns={setColumns}
              >
                {cards.map(
                  (card) =>
                    card.columnId === column.id && (
                      <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        author={card.author}
                        description={card.description}
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
