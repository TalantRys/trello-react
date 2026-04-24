import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ColumnType } from "../../types";
import { columnsArr } from "../../data/data";
import type { RootState } from "../store";
import { utils } from "../../functions";

type ColumnsState = ColumnType;

const initialState: ColumnsState[] = columnsArr;

const ColumnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    editTitle: (state, action: PayloadAction<ColumnsState>) => {
      const column = utils.findById(state, action.payload.id);
      if (column) column.title = action.payload.title;
    },
  },
});

export const { editTitle } = ColumnsSlice.actions;
export default ColumnsSlice.reducer;

export function selectColumns(state: RootState) {
  return state.columns;
}

export function selectColumnById(
  state: RootState,
  id: number,
): ColumnType | undefined {
  return utils.findById(state.columns, id);
}
