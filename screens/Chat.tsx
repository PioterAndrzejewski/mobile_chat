import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROOM_INFO, SEND_MESSAGE } from "../apollo/queries";
import { Props } from "../types/type";
import { Message } from "../apollo/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomMessage from "../Components/CustomMessage";

export default function ChatScreen({
  route: {
    params: { roomId },
  },
  navigation,
}: Props) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [interlocutorTyping, setInterlocutorTyping] = useState(true);
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

      const saveToStorage = async () => {
        try {
          data.room.messages.forEach((message: Message) =>
            AsyncStorage.setItem(message.id, "red"),
          );
        } catch (error) {
          console.log(error);
        }
      };
      saveToStorage();
    }
  }, [data]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          setUserId(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

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
        _id: userId || "",
      }}
      onSend={(messages) => onSend(messages)}
      placeholder=''
      alwaysShowSend={true}
      renderTime={() => null}
      renderDay={() => null}
      renderMessage={(props) => (
        <CustomMessage
          message={props.currentMessage}
          userId={userId}
          interlocutorTyping={false}
        />
      )}
      renderFooter={() => (
        <CustomMessage message={null} userId={null} interlocutorTyping />
      )}
    />
  );
}
