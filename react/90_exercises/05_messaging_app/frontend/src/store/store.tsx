import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../slices/notificationSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
