import apiClient from "./client";
import type { ApiResponse, User } from "../utils/types";

export const registerUser = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await apiClient.post<ApiResponse<{ user: User; token: string }>>("/auth/register", payload);
  return data.data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const { data } = await apiClient.post<ApiResponse<{ user: User; token: string }>>("/auth/login", payload);
  return data.data;
};

export const fetchMe = async () => {
  const { data } = await apiClient.get<ApiResponse<{ user: User }>>("/auth/me");
  return data.data.user;
};
