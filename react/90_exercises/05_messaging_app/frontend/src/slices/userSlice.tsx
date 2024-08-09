import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

import { Message, User, UserState } from "../utils/types";
import { userApi } from "../api/userApi";
import { setNotification } from "./notificationSlice";
import { AppDispatch } from "../store/store";

const getInitialState = (): UserState => {
  const state = sessionStorage.getItem("userstate");
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      isLogged: false,
      token: "",
      username: "",
    };
  }
};

const initialState: UserState = getInitialState();

const saveToStorage = (state: UserState) => {
  sessionStorage.setItem("userstate", JSON.stringify(state));
};

const deleteStorage = () => {
  sessionStorage.removeItem("userstate");
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state: UserState, action: PayloadAction<User>) {
      const user = action.payload;
      console.log("Registering user", user);
      return state;
    },
    login(
      state: UserState,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      const { user, token } = action.payload;
      console.log("Logging in user", user);
      return {
        ...state,
        token: token,
        username: user.username,
        isLogged: true,
      };
    },
    logout(state: UserState, action: PayloadAction<string>) {
      const token = action.payload;
      console.log("Logging out user", token);
      return {
        ...state,
        token: "",
        username: "",
        isLogged: false,
      };
    },
  },
});

export const registerUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res: Message = await userApi.register(user);
      dispatch(register(user));
      dispatch(setNotification(res.message));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        dispatch(setNotification(error.response?.data.message));
      }
      console.log("error", error);
    }
  };
};

export const loginUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res: UserState = await userApi.login(user);
      console.log("login res", res);
      dispatch(login({ user, token: res.token }));
      saveToStorage(res);
    } catch (error: unknown) {
      deleteStorage();
      if (isAxiosError(error)) {
        dispatch(setNotification(error.response?.data.message));
      }
      console.log("error", error);
    }
  };
};

export const logoutUser = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res: Message = await userApi.logout(token);
      console.log("logout res", res);
      dispatch(logout(token));
      dispatch(setNotification(res.message));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        dispatch(setNotification(error.response?.data.message));
      }
      console.log("error", error);
    }
  };
};

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;
