import axios from "axios";
import { Message, User, UserState } from "../utils/types";

const baseUrl = "http://localhost:3001";

const register = async (user: User): Promise<Message> => {
  const res = await axios.post<Message>(`${baseUrl}/register`, user);
  return res.data;
};

const login = async (user: User): Promise<UserState> => {
  const res = await axios.post<UserState>(`${baseUrl}/login`, user);
  return res.data;
};

const logout = async (token: string): Promise<Message> => {
  const res = await axios.post<Message>(
    `${baseUrl}/logout`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
  console.log("axios token", token);
  return res.data;
};

export const userApi = {
  register,
  login,
  logout,
};
