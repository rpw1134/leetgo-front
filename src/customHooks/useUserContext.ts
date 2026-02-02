import { useContext } from "react";
import { userContext, type UserContextType } from "../context/userContext";

export default function useUserContext(): UserContextType {
  const { user, setUser } = useContext(userContext);
  return { user, setUser };
}
