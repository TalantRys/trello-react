import { combineReducers } from "@reduxjs/toolkit";

import { default as columns } from "./columns";
import { default as author } from "./author";

import CardsReducer from "../cards/cardSlice";

//TODO:refactor card slices
export default combineReducers({
  columns,
  author,
  cards: CardsReducer,
});
