import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppLoading from "./AppLoading";
import CustomMessage from "./CustomMessage";
import CustomInputToolbar from "./CustomInputToolbar";
import CustomModal from "./CustomModal";

import { styleGuide } from "../styles/guide";
import { GET_ROOM_INFO, SEND_MESSAGE } from "../apollo/queries";
import { Message } from "../apollo/types";
import { HomeScreenNavigationProp } from "../types/type";
import { getStoredUser } from "../utils/getStoredUser";
import { ChatBoxProps } from "../types/props";

export default function ChatBox({ roomId }: ChatBoxProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId,
    },
    pollInterval: 1000,
  });
  const [sendMessage, sentResults] = useMutation(SEND_MESSAGE);
  const [interlocutorTyping, setInterlocutorTyping] = useState(false);
  const [thrownError, setThrownError] = useState<any>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setInterlocutorTyping(true);
    }, 1800);
    const timeout2 = setTimeout(() => {
      setInterlocutorTyping(false);
    }, 5000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

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
            AsyncStorage.setItem(roomId, message.id),
          );
        } catch (error) {
          setThrownError(error);
        }
      };
      saveToStorage();
    }
  }, [data]);

  useEffect(() => {
    const getUser = async () => {
      const userId = await getStoredUser();
      setUserId(userId);
    };

    getUser();
  }, []);

  const onSend = (message: string | undefined) => {
    if (message?.trim() === "") {
      return;
    }

    const newIMessage = [
      {
        _id: Math.random(),
        text: message,
        createdAt: new Date(),
        user: {
          _id: userId || "",
        },
      },
    ];
    sendMessage({
      variables: {
        body: message,
        roomId,
      },
    });
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, newIMessage as IMessage[]),
    );
  };

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <AppLoading />
      ) : (
        <GiftedChat
          messages={messages}
          user={{
            _id: userId || "",
          }}
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
          renderInputToolbar={(props) => (
            <CustomInputToolbar
              {...props}
              onSend={onSend}
              loading={sentResults.loading}
            />
          )}
          renderFooter={() => (
            <CustomMessage
              message={null}
              userId={null}
              interlocutorTyping={interlocutorTyping}
            />
          )}
        />
      )}
      {(error || thrownError || sentResults.error) && (
        <CustomModal>
          <Text>
            {error?.message ||
              thrownError?.message ||
              sentResults.error?.message}
          </Text>
        </CustomModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: styleGuide.color.blue["100"],
  },
});
