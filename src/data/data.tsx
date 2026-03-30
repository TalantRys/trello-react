interface CardProps {
  id: number;
  columnId: number;
  title: string;
  author: string;
  description?: string;
}

export const columnsArr: { id: number; title: string }[] = [
  { id: 0, title: "TODO" },
  { id: 1, title: "In progress" },
  { id: 2, title: "Processing" },
  { id: 3, title: "Done" },
];

export const cards: Array<CardProps> = [
  {
    id: 0,
    columnId: 0,
    title: "Card 1",
    author: "Billy",
  },
  {
    id: 1,
    columnId: 0,
    title: "Card 2",
    author: "Carl",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    id: 2,
    columnId: 1,
    title: "Card 3",
    author: "Robert",
  },
];
