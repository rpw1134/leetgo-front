import { API_URL } from "../constants";

async function addUserToWaitlist(email: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { addUserToWaitlist };
