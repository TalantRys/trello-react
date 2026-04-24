import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardType, CommentType } from "../../types";
import { cardsArr } from "../../data/data";

type CardsState = CardType;
interface CommentState extends CommentType {
  cardId: number;
}
const initialState: CardsState[] = cardsArr;

const CardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardsState>) => {
      state.push(action.payload);
    },

    editCard: (state, action: PayloadAction<CardsState>) => {
      const cardIndex = state.findIndex(
        (card) => card.id === action.payload.id,
      );
      if (cardIndex !== -1) state[cardIndex] = action.payload;
    },

    deleteCard: (state, action: PayloadAction<number>) => {
      return state.filter((card) => card.id !== action.payload);
    },

    addComment: (state, action: PayloadAction<CommentState>) => {
      const cardIndex = state.findIndex(
        (card) => card.id === action.payload.cardId,
      );
      if (cardIndex !== -1) state[cardIndex].comments.push(action.payload);
    },

    editComment: (state, action: PayloadAction<CommentState>) => {
      const { cardId, id, text } = action.payload;

      const cardIndex = state.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        const comment = state[cardIndex].comments.find(
          (comment) => comment.id === id,
        );
        if (comment) {
          comment.text = text;
        }
      }
    },

    deleteComment: (
      state,
      action: PayloadAction<{ cardId: number; commentId: number }>,
    ) => {
      const { cardId, commentId } = action.payload;
      const cardIndex = state.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        state[cardIndex].comments = state[cardIndex].comments.filter(
          (card) => card.id !== commentId,
        );
      }
    },
  },
});

export const {
  addCard,
  editCard,
  deleteCard,
  addComment,
  editComment,
  deleteComment,
} = CardsSlice.actions;
export default CardsSlice.reducer;
