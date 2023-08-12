import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery } from "@apollo/client";
import { GET_ROOM_INFO } from "../apollo/queries";
import { Props } from "../types/type";
import { Message } from "../apollo/queries";

export default function ChatScreen({
  route: {
    params: { roomId },
  },
}: Props) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.room.messages);
      const messagesAltered = data.room.messages.map((message: Message) => ({
        _id: message.id,
        text: message.body,
        createdAt: new Date(message.insertedAt),
        user: {
          _id: message.user.id,
          name: `${message.user.firstName} ${message.user.lastName}`,
        },
      }));
      setMessages(messagesAltered);
    }
  }, [data]);

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: "f58cc17e-7917-48f4-8a93-46642cf890c4",
      }}
    />
  );
}
