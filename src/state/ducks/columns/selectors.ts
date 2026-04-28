import { utils } from "../../../functions";
import type { ColumnsState } from "./types";
import type { RootState } from "../../store";

export function selectColumns(state: RootState) {
  return state.columns;
}

export function selectColumnById(
  state: RootState,
  id: number,
): ColumnsState | undefined {
  return utils.findById(state.columns, id);
}
