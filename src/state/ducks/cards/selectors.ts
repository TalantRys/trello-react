import { utils } from "../../../functions";
import type { RootState } from "../../store";

export function selectCards(state: RootState) {
  return state.cards;
}

export function selectCardById(state: RootState, id: number) {
  return utils.findById(state.cards, id);
}

export function selectComments(state: RootState, id: number) {
  return utils.findById(state.cards, id)?.comments ?? [];
}
