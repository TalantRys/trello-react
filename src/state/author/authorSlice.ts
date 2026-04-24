import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: string = "";

const AuthorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { addName } = AuthorSlice.actions;
export default AuthorSlice.reducer;

export function selectAuthor(state: RootState) {
  return state.author;
}
