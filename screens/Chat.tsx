import React from "react";
import { Props } from "../types/type";
import ChatBox from "../Components/ChatBox";

export default function ChatScreen({
  route: {
    params: { roomId },
  },
}: Props) {
  return <ChatBox roomId={roomId} />;
}
