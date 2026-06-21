export type ColumnType = { id: number; title: string };

export type CardType = {
  id: number;
  columnId: number;
  title: string;
  author: string;
  description?: string;
  comments: CommentType[];
};

export type CommentType = {
  id: number;
  author: string;
  text: string;
};
