import { useContext } from "react";
import type { User } from "../types/user";
import { userContext } from "../context/userContext";

export default function useUserContext(): User {
  const { email, username, pfpUrl, paidTier } = useContext(userContext);
  return { email, username, pfpUrl, paidTier };
}
