import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store/store";
import { Dispatch } from "redux";

export interface NotificationState {
  value: string | null;
}

const initialState: NotificationState = {
  value: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  },
});

export const setNotification = (content: string | null) => {
  return async (dispatch: Dispatch) => {
    dispatch(newNotification(null));
    dispatch(newNotification(content));
    setTimeout(() => {
      dispatch(newNotification(null));
    }, 7000);
  };
};

export const { newNotification } = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectNotification = (state: RootState) =>
//   state.notification.value;

export default notificationSlice.reducer;
