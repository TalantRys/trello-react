import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { cardsArr } from "../../../data/data";
import { utils } from "../../../functions";
import type {
  CardsState,
  AddCommentPayload,
  CommentUpdate,
  CommentDelete,
} from "./types";

const initialState: CardsState[] = cardsArr;

const CardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: {
      prepare: (columnId, title, author) => ({
        payload: {
          id: Date.now(),
          columnId,
          title,
          comments: [],
          author,
        },
      }),
      reducer: (state, action: PayloadAction<CardsState>) => {
        state.push(action.payload);
      },
    },

    editCardTitle: (
      state,
      action: PayloadAction<Pick<CardsState, "id" | "title">>,
    ) => {
      const { id, title } = action.payload;
      const card = utils.findById(state, id);
      if (card) card.title = title;
    },

    editCardDesc: (
      state,
      action: PayloadAction<Pick<CardsState, "id" | "description">>,
    ) => {
      const { id, description } = action.payload;
      const card = utils.findById(state, id);
      if (card) card.description = description;
    },

    deleteCard: (state, action: PayloadAction<number>) => {
      return state.filter((card) => card.id !== action.payload);
    },

    addComment: {
      prepare: (cardId, text, author) => ({
        payload: {
          id: Date.now(),
          cardId,
          text,
          author,
        },
      }),
      reducer: (state, action: PayloadAction<AddCommentPayload>) => {
        const cardIndex = utils.findIndexById(state, action.payload.cardId);
        if (cardIndex !== -1) state[cardIndex].comments.push(action.payload);
      },
    },

    editComment: (state, action: PayloadAction<CommentUpdate>) => {
      const { cardId, id, text } = action.payload;
      const card = utils.findById(state, cardId);
      if (card) {
        const comment = card.comments.find((comment) => comment.id === id);
        if (comment) {
          comment.text = text;
        }
      }
    },

    deleteComment: (state, action: PayloadAction<CommentDelete>) => {
      const { cardId, id } = action.payload;
      const card = utils.findById(state, cardId);
      if (card) {
        card.comments = card.comments.filter((card) => card.id !== id);
      }
    },
  },
});

export const cardActions = CardsSlice.actions;
export default CardsSlice.reducer;
