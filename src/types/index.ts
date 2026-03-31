export type ColumnType = { id: number; title: string };

export type CardType = {
  id: number;
  columnId: number;
  title: string;
  author: string;
  description?: string;
}