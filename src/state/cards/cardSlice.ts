import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardType, CommentType } from "../../types";
import { cardsArr } from "../../data/data";
import type { RootState } from "../store";
import { utils } from "../../functions";

type CardsState = CardType;
interface AddCommentPayload extends CommentType {
  cardId: number;
}

type CommentUpdate = Pick<AddCommentPayload, "cardId" | "id" | "text">;
type CommentDelete = Pick<AddCommentPayload, "cardId" | "id">;

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

export const {
  addCard,
  editCardTitle,
  editCardDesc,
  deleteCard,
  addComment,
  editComment,
  deleteComment,
} = CardsSlice.actions;
export default CardsSlice.reducer;

export function selectCards(state: RootState) {
  return state.cards;
}

export function selectCardById(state: RootState, id: number) {
  return utils.findById(state.cards, id);
}

export function selectComments(state: RootState, id: number) {
  return utils.findById(state.cards, id)?.comments ?? [];
}
