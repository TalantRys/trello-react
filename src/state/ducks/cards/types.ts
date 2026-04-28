import type { CardType, CommentType } from "../../../types";

export type CardsState = CardType;
export interface AddCommentPayload extends CommentType {
  cardId: number;
}
export type CommentUpdate = Pick<AddCommentPayload, "cardId" | "id" | "text">;
export type CommentDelete = Pick<AddCommentPayload, "cardId" | "id">;
