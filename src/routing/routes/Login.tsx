import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/login/LoginForm";
import { GridOverlay } from "../../components/reusable/backgrounds/GridOverlay";
import { useMutation } from "@tanstack/react-query";
import { loginUser, loginUserWithOAuth } from "../../utils/api/users";
import useUserContext from "../../customHooks/useUserContext";
import type { User } from "../../types/user";
import type { UserLoginParams } from "../../types/auth";

export const Login: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const emailMutation = useMutation<User | void, Error, UserLoginParams>({
    mutationFn: loginUser,
  });
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setServerError(null);

    try {
      const user: User | void = await emailMutation.mutateAsync({
        email,
        password,
      });
      if (user) {
        setUser(user);
        navigate("/profile");
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Invalid email or password",
      );
    }
  };

  const handleGoogleLogin = () => {
    loginUserWithOAuth("google");
  };

  const handleGithubLogin = () => {
    loginUserWithOAuth("github");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 login-bg" />

      {/* Subtle grid overlay */}
      <GridOverlay size={60} opacity={0.01} fixed />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm mx-auto">
          {/* Header - minimal */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="font-eb-garamond text-3xl font-light text-leetgo-bright group-hover:text-white transition-colors">
                  &lt;
                </span>
                <span className="font-eb-garamond text-3xl font-light text-white/80">
                  /
                </span>
                <span className="font-eb-garamond text-3xl font-light text-leetgo-bright group-hover:text-white transition-colors">
                  &gt;
                </span>
              </div>
            </Link>
          </div>

          {/* Login card */}
          <div className="login-card p-8 rounded-xl">
            <LoginForm
              onSubmit={handleLogin}
              onGoogleLogin={handleGoogleLogin}
              onGithubLogin={handleGithubLogin}
              isLoading={emailMutation.isPending}
              serverError={serverError}
            />
          </div>
        </div>
      </div>

      {/* Subtle accent line at top */}
      <div className="fixed top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-leetgo-bright/20 to-transparent" />
    </div>
  );
};
