import { API_URL } from "../constants";
import axios from "axios";

async function addUserToWaitlist(email: string): Promise<void> {
  try {
    const response = await axios.post(
      `${API_URL}/waitlist`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // Success - response.data contains what your backend returns
    return response.data;
  } catch (error) {
    // Error - axios throws on non-2xx status codes
    if (axios.isAxiosError(error) && error.response) {
      // Access error message from your backend's error response
      const errorMessage =
        error.response.data?.detail || "Failed to add user to waitlist";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to add user to waitlist");
  }
}

export { addUserToWaitlist };
