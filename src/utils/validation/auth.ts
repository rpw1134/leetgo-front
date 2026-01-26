/**
 * Authentication validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

/**
 * Validates an email address format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: null };
};

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters" };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: "Password must contain an uppercase letter" };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: "Password must contain a lowercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must contain a number" };
  }

  return { isValid: true, error: null };
};

/**
 * Validates that password confirmation matches
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): ValidationResult => {
  if (!confirmation) {
    return { isValid: false, error: "Please confirm your password" };
  }

  if (password !== confirmation) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true, error: null };
};

/**
 * Returns password strength level for visual feedback
 */
export type PasswordStrength = "weak" | "medium" | "strong";

export const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
};
