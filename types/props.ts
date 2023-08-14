import { ReactNode } from "react";
import { IMessage } from "react-native-gifted-chat";

export type Credentials =
  | "email"
  | "firstName"
  | "lastName"
  | "password"
  | "passwordConfirmation";

export type CredentialsState = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type ChatBoxProps = {
  roomId: string;
};

export type CustomInputProps = {
  containerStyle?: any;
  loading: boolean;
  onSend: (text: string | undefined) => void;
};

export type CustomMessageProps = {
  userId: string | null;
  interlocutorTyping: boolean;
  message: IMessage | null | undefined;
};

export type CustomModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

export type CustomTextInputProps = {
  label: string;
  secure?: boolean;
  onChange: (newValue: string, field?: Credentials | undefined) => void;
  value: string;
  field?: Credentials | undefined;
  error?: string;
  isTouched?: boolean;
};

export type LoginTitleProps = {
  title: string;
};

export type RoomsCardProps = {
  id: string;
};
