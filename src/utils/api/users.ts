import axios from "axios";

async function createUser(email: string, password: string): Promise<void> {
  try {
    const res = await axios.post(
      "/api/users",
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
