// import * as authorOperations from "./operations";
// import * as authorActions from "./actions";
import * as authorTypes from "./types";
import * as authorSelectors from "./selectors";
import { default as reducer, authorActions } from "./slice.ts";

export { authorSelectors, authorActions, authorTypes };

export default reducer;
