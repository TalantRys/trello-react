import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { columnsArr } from "../../../data/data";
import type { ColumnsState } from "./types";
import { utils } from "../../../functions";

const initialState: ColumnsState[] = columnsArr;

const ColumnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    editColumnTitle: {
      reducer(state: ColumnsState[], action: PayloadAction<ColumnsState>) {
        const column = utils.findById(state, action.payload.id);
        if (column) column.title = action.payload.title;
      },
      prepare: (id: number, title: string) => ({ payload: { id, title } }),
    },
  }
});

export const columnActions = ColumnsSlice.actions;

export default ColumnsSlice.reducer;
