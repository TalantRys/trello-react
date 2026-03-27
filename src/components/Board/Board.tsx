import classNames from "classnames";
import styles from "./board.module.scss";
import Column from "../Column/Column";
import { useState } from "react";
import ModalProvider from "../ModalProvider/ModalProvider";
import CardInfo from "../CardInfo/CardInfo";
interface CardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

let cards: Array<CardProps> = [
  {
    id: 0,
    title: "",
    author: "Billy",
  },
  {
    id: 1,
    title: "",
    author: "Carl",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    id: 2,
    title: "",
    author: "Robert",
  },
];

cards = cards.map((card, i) => ({ ...card, title: `Card ${i + 1}` }));

const columnsArr: { id: number; title: string }[] = [
  { id: 0, title: "TODO" },
  { id: 1, title: "In progress" },
  { id: 2, title: "Processing" },
  { id: 3, title: "Done" },
];

function Board() {
  const [author, setAuthor] = useState("");
  const [columns, setColumns] = useState(columnsArr);
  const [showModal, setShowModal] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    } else {
      setAuthor(name);
      setShowModal(false);
    }
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
        <form onSubmit={handleFormSubmit}>
          <h2>Enter your name</h2>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={author}
            placeholder="Your name"
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
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
                cards={cards}
                columns={columns}
                onSetColumns={setColumns}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
