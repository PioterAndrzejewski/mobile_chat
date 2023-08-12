import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROOM_INFO, SEND_MESSAGE } from "../apollo/queries";
import { Props } from "../types/type";
import { Message } from "../apollo/queries";

const USER_ID = "f58cc17e-7917-48f4-8a93-46642cf890c4";

export default function ChatScreen({
  route: {
    params: { roomId },
  },
  navigation,
}: Props) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId,
    },
    pollInterval: 1000,
  });
  const [sendMessage, sentResults] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (data) {
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
      navigation.setOptions({
        title: data.room.name.replace("The one with", ""),
      });
    }
  }, [data]);

  useEffect(() => {}, [sentResults]);

  const onSend = (newMessages: IMessage[]) => {
    sendMessage({
      variables: {
        body: newMessages[0].text,
        roomId,
      },
    });
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: USER_ID,
      }}
      onSend={(messages) => onSend(messages)}
    />
  );
}
