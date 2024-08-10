export type User = {
  username: string;
  password: string;
};

export type AppState = {
  isLogged: boolean;
  token: string;
  usernames: string;
};

export type ApiResponse = {
  message: string;
};

export type LoginStatus = {
  isLogged: boolean;
  token: string;
  messagetoken: string;
  user: string;
};
