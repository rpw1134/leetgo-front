import axios from "axios";
import type { CreateUserParams } from "../../types/auth";
import { axiosClient } from "../constants";

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
export { createUser };
