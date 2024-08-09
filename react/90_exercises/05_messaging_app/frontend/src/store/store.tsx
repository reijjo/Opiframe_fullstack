import { configureStore } from "@reduxjs/toolkit";
import notificationReducer, {
  NotificationState,
} from "../slices/notificationSlice";
import userReducer from "../slices/userSlice";
import { UserState } from "../utils/types";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export const allStates = (state: {
  notification: NotificationState;
  user: UserState;
}) => state.user;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
