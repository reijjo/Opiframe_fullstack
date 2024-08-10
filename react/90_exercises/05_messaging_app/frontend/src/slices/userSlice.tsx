import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store";
import { LoginStatus, User } from "../utils/types";
import { userApi } from "../api/userApi";
import { setNotification } from "./notificationSlice";
import { isAxiosError } from "axios";

const initialState: User = {
  username: "",
  password: "",
};

const getInitialState = (): LoginStatus => {
  const state = sessionStorage.getItem("loginstate");
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      isLogged: false,
      token: "",
      messagetoken: "",
      user: "",
    };
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const registerUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userApi.register(user);

      dispatch(register(user));
      dispatch(setNotification(res.message));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        dispatch(setNotification(error.response?.data.message));
      }
      console.error("Error in registerUser", error);
    }
  };
};

export const { register } = userSlice.actions;
export default userSlice.reducer;
