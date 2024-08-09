import { NotificationState } from "../slices/notificationSlice";

export type User = {
  username: string;
  password: string;
};

export type Message = {
  message: string;
  infoColor?: string;
};

export type UserState = {
  isLogged: boolean;
  token: string;
  username: string;
};

export type AllStates = {
  user: UserState;
  notification: NotificationState;
};
