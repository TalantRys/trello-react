import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ColumnType } from "../../types";
import { columnsArr } from "../../data/data";

type ColumnsState = ColumnType;

const initialState: ColumnsState[] = columnsArr;

const ColumnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    editTitle: (state, action: PayloadAction<ColumnsState>) => {
      const column = state.find((column) => column.id === action.payload.id);
      if (column) column.title = action.payload.title;
    },
  },
});

export const { editTitle } = ColumnsSlice.actions;
export default ColumnsSlice.reducer;
