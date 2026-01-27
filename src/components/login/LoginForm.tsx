import { useState, useCallback } from "react";
import { GlassInput } from "../reusable/inputs/GlassInput";
import { PrimaryButton } from "../reusable/buttons/PrimaryButton";
import { OAuthButton } from "../reusable/buttons/OAuthButton";
import { validateEmail } from "../../utils/validation/auth";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onGithubLogin: () => void;
  isLoading?: boolean;
  serverError?: string | null;
}

export const LoginForm = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  isLoading = false,
  serverError,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleEmailBlur = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
    const result = validateEmail(email);
    if (!result.isValid) {
      setEmailError(result.error);
    }
  }, [email]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      setEmailError(emailResult.error);
      setTouched({ email: true, password: true });
      return;
    }

    if (!password) {
      setTouched({ email: true, password: true });
      return;
    }

    onSubmit(email, password);
  };

  return (
    <div className="w-full space-y-6">
      {/* OAuth Buttons */}
      <div className="space-y-3">
        <OAuthButton provider="google" onClick={onGoogleLogin} disabled={isLoading} />
        <OAuthButton provider="github" onClick={onGithubLogin} disabled={isLoading} />
      </div>

      {/* Divider */}
      <div className="login-divider font-raleway">or</div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1">
          <label
            htmlFor="login-email"
            className="block text-sm font-raleway text-slate-500 ml-1"
          >
            Email
          </label>
          <GlassInput
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="you@example.com"
            isValid={!emailError || !touched.email}
            autoComplete="email"
            className="!bg-slate-800/50 !border-slate-700/50 hover:!border-slate-600 focus:!ring-leetgo-bright/50"
          />
          {emailError && touched.email && (
            <p className="text-red-400 text-sm font-raleway ml-1 animate-fade-in">
              {emailError}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="login-password"
              className="block text-sm font-raleway text-slate-500 ml-1"
            >
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-sm font-raleway text-slate-500 hover:text-leetgo-bright transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <GlassInput
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            placeholder="Enter your password"
            isValid={!(!password && touched.password)}
            autoComplete="current-password"
            className="!bg-slate-800/50 !border-slate-700/50 hover:!border-slate-600 focus:!ring-leetgo-bright/50"
          />
          {!password && touched.password && (
            <p className="text-red-400 text-sm font-raleway ml-1 animate-fade-in">
              Password is required
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm font-raleway text-center">
              {serverError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-leetgo-darkest/30 border-t-leetgo-darkest rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </PrimaryButton>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-slate-500 text-sm font-raleway">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-leetgo-bright hover:text-leetgo-primary transition-colors"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};
