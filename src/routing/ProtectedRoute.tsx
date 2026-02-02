import { Navigate, Outlet } from "react-router-dom";
import useUserContext from "../customHooks/useUserContext";

export const ProtectedRoute = () => {
  const { user } = useUserContext();

  // If there is no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child route
  return <Outlet />;
};
