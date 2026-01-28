import { useState, useCallback } from "react";
import { GlassInput } from "../reusable/inputs/GlassInput";
import { PrimaryButton } from "../reusable/buttons/PrimaryButton";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import type { SignupFormData, SignupFormErrors } from "../../types/auth";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  getPasswordStrength,
} from "../../utils/validation/auth";
import type { PasswordStrength } from "../../utils/validation/auth";

interface SignupFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  serverError?: string | null;
}

const initialFormData: SignupFormData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const initialErrors: SignupFormErrors = {
  email: null,
  password: null,
  passwordConfirmation: null,
};

export const SignupForm = ({
  onSubmit,
  isLoading = false,
  serverError,
}: SignupFormProps) => {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<SignupFormErrors>(initialErrors);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const passwordStrength: PasswordStrength = getPasswordStrength(
    formData.password,
  );

  const updateField = useCallback(
    (field: keyof SignupFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback((field: keyof SignupFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate on blur
    setFormData((current) => {
      let validationResult;
      switch (field) {
        case "email":
          validationResult = validateEmail(current.email);
          break;
        case "password":
          validationResult = validatePassword(current.password);
          break;
        case "passwordConfirmation":
          validationResult = validatePasswordConfirmation(
            current.password,
            current.passwordConfirmation,
          );
          break;
      }
      if (!validationResult.isValid) {
        setErrors((prev) => ({ ...prev, [field]: validationResult.error }));
      }
      return current;
    });
  }, []);

  const validateAll = (): boolean => {
    const emailResult = validateEmail(formData.email);
    const passwordResult = validatePassword(formData.password);
    const confirmResult = validatePasswordConfirmation(
      formData.password,
      formData.passwordConfirmation,
    );

    const newErrors: SignupFormErrors = {
      email: emailResult.error,
      password: passwordResult.error,
      passwordConfirmation: confirmResult.error,
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true, passwordConfirmation: true });

    return (
      emailResult.isValid && passwordResult.isValid && confirmResult.isValid
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAll()) {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Email Field */}
      <div className="relative">
        <label
          htmlFor="email"
          className="block text-sm font-raleway text-white/70 ml-1 mb-1"
        >
          Email
        </label>
        <GlassInput
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
          isValid={!errors.email || !touched.email}
          autoComplete="email"
        />
        {errors.email && touched.email && (
          <p className="absolute top-full left-0 mt-1 text-red-400 text-xs font-raleway ml-2 animate-fade-in">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-raleway text-white/70 ml-1 mb-1"
        >
          Password
        </label>
        <GlassInput
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          placeholder="Create a secure password"
          isValid={!errors.password || !touched.password}
          autoComplete="new-password"
        />
        <PasswordStrengthIndicator
          strength={passwordStrength}
          show={formData.password.length > 0}
        />
        {errors.password && touched.password && (
          <p className="absolute top-full left-0 mt-1 text-red-400 text-xs font-raleway ml-2 animate-fade-in">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <label
          htmlFor="passwordConfirmation"
          className="block text-sm font-raleway text-white/70 ml-1 mb-1"
        >
          Confirm Password
        </label>
        <GlassInput
          id="passwordConfirmation"
          type="password"
          value={formData.passwordConfirmation}
          onChange={(e) => updateField("passwordConfirmation", e.target.value)}
          onBlur={() => handleBlur("passwordConfirmation")}
          placeholder="Confirm your password"
          isValid={
            !errors.passwordConfirmation || !touched.passwordConfirmation
          }
          autoComplete="new-password"
        />
        {errors.passwordConfirmation && touched.passwordConfirmation && (
          <p className="absolute top-full left-0 mt-1 text-red-400 text-xs font-raleway ml-2 animate-fade-in">
            {errors.passwordConfirmation}
          </p>
        )}
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-fade-in">
          <p className="text-red-400 text-sm font-raleway text-center">
            {serverError}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-leetgo-darkest/30 border-t-leetgo-darkest rounded-full animate-spin" />
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </PrimaryButton>
      </div>

      {/* Login Link */}
      <p className="text-center text-white/50 text-sm font-raleway">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-leetgo-bright hover:text-leetgo-primary transition-colors"
        >
          Sign in
        </a>
      </p>
    </form>
  );
};
