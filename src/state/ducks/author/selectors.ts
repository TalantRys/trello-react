import type { RootState } from "../../store";


export function selectAuthor(state: RootState) {
  return state.author;
}
