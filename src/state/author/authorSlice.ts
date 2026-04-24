import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
