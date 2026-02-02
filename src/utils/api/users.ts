import axios from "axios";
import type { CreateUserParams, UserLoginParams } from "../../types/auth";
import {
  type User,
  type UserApiResponse,
  mapApiResponseToUser,
} from "../../types/user";
import { axiosClient, API_URL } from "../constants";

async function createUser({
  email,
  password,
}: CreateUserParams): Promise<void> {
  try {
    const res = await axiosClient.post(
      "/auth/signup",
      { email, password },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.detail || "Failed to create user";
      throw new Error(errorMessage);
    }
  }
}

async function loginUser({
  email,
  password,
}: UserLoginParams): Promise<User | void> {
  try {
    const res = await axiosClient.post(
      "/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } },
    );
    return mapApiResponseToUser(res.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.detail || "Failed to login user";
      throw new Error(errorMessage);
    }
  }
}

function loginUserWithOAuth(provider: "google" | "github"): void {
  // OAuth requires full page redirect, not AJAX call
  window.location.href = `${API_URL}/auth/login/${provider}`;
}

async function fetchCurrentUser(): Promise<User> {
  const res = await axiosClient.get<UserApiResponse>("/auth/user");
  return mapApiResponseToUser(res.data);
}

export { createUser, loginUser, loginUserWithOAuth, fetchCurrentUser };
