import { API_URL } from "../constants";

async function addUserToWaitlist(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to add user to waitlist");
  }
  return data;
}

export { addUserToWaitlist };
