import { Credentials, CredentialsState } from "../types/props";

const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export const validate = (
  field: string | undefined,
  newValue: string,
  credentials: CredentialsState,
) => {
  let validationError = "";
  let clearPasswordError = false;
  switch (field) {
    case "email":
      if (!regex.test(newValue)) {
        validationError = "Email is wrong";
      }
      break;
    case "firstName":
      if (newValue.trim().length < 3) {
        validationError = "First name is too short";
      }
      break;
    case "lastName":
      if (newValue.trim().length < 3) {
        validationError = "Last name is too short";
      }
      break;
    case "password":
      if (newValue !== credentials.passwordConfirmation) {
        validationError = "Passwords are not the same";
      }
      if (newValue.length < 8) {
        validationError = "Password is too short";
      }
      if (newValue === credentials.passwordConfirmation) {
        clearPasswordError = true;
      }
      break;
    case "passwordConfirmation":
      if (newValue !== credentials.password) {
        validationError = "Passwords are not the same";
      }
      if (newValue === credentials.password) {
        clearPasswordError = true;
      }
      break;
  }
  return { validationError, clearPasswordError };
};
