import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthorState } from "./types";

const initialState: AuthorState = "";

const AuthorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addName: (_state, action: PayloadAction<AuthorState>) => {
      return action.payload;
    },
  },
});

export const authorActions = AuthorSlice.actions;
export default AuthorSlice.reducer;


