import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

// console.log("Store state:", store.getState());
