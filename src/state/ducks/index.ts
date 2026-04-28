import { combineReducers } from "@reduxjs/toolkit";

import { default as columns } from "./columns";

import AuthorReducer from "../author/authorSlice";
import CardsReducer from "../cards/cardSlice";

//TODO:refactor author and card slices
export default combineReducers({
  columns,
  author: AuthorReducer,
  cards: CardsReducer,
});