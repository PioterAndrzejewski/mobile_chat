import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery } from "@apollo/client";
import { GET_ROOM_INFO } from "../apollo/queries";
import { Props } from "../types/type";

export default function ChatScreen({
  route: {
    params: { roomId },
  },
}: Props) {
  const [messages, setMessages] = useState<any>([]);
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId,
    },
  });

  const onSend = useCallback((messages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  console.log(data);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
