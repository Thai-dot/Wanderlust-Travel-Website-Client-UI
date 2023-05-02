import { RegisterPayload } from "../features/auth/authSlice";
import { Token, User } from "../models";
import axiosClient from "./axiosClient";

const userApi = {
  loadUser: (): Promise<User> => {
    const url = "/user/token";
    return axiosClient.get(url);
  },
  login: (user: { username: string; password: string }): Promise<Token> => {
    const url = "/user/login";
    return axiosClient.post(url, user);
  },
  register: (user: RegisterPayload): Promise<Token> => {
    const url = "/user/register";
    return axiosClient.post(url, user);
  },
  update: (user: Omit<User, "role" | "username">): Promise<User> => {
    const url = "/user";
    return axiosClient.put(url, user);
  },
};

export default userApi;
