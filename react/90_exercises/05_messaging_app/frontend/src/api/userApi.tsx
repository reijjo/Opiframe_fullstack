import axios from "axios";
import { ApiResponse, LoginStatus, User } from "../utils/types";

const baseUrl = "http://localhost:3001";

const register = async (user: User): Promise<ApiResponse> => {
  const res = await axios.post(`${baseUrl}/register`, user);
  return res.data;
};

const login = async (user: User): Promise<LoginStatus> => {
  const res = await axios.post(`${baseUrl}/login`, user);
  return res.data;
};

export const userApi = {
  register,
};
