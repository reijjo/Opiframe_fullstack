import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(newNotification(content));
    setTimeout(() => {
      dispatch(newNotification(null));
    }, time * 1000);
  };
};

export const { newNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
