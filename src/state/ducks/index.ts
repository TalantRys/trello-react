import { combineReducers } from "@reduxjs/toolkit";

import { default as columns } from "./columns";
import { default as author } from "./author";
import { default as cards } from "./cards";

export default combineReducers({
  columns,
  author,
  cards,
});
