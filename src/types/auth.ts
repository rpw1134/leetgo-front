/**
 * Authentication-related types
 */

export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupFormErrors {
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

export interface SignupCredentials {
  email: string;
  password: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
}
