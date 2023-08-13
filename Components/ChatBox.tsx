import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROOM_INFO, SEND_MESSAGE } from "../apollo/queries";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/type";
import { Message } from "../apollo/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomMessage from "./CustomMessage";
import CustomInput from "./CustomInput";
import { styleGuide } from "../styles/guide";

type ChatBoxProps = {
  roomId: string;
};

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

  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  const onSend = (message: string) => {
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
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newIMessage));
  };

  return (
    (
      <View style={styles.wrapper}>
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
            <CustomInput {...props} onSend={onSend} />
          )}
          renderFooter={() => (
            <CustomMessage message={null} userId={null} interlocutorTyping />
          )}
        />
      </View>
    ) || (
      <View>
        <Text>loading...</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: styleGuide.color.blue["100"],
  },
});