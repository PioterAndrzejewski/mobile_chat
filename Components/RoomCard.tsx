import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomModal from "./CustomModal";
import { DotIcon, ProfileIcon } from "./SvgIcons";

import { getTimeAgo } from "../utils/getTimeAgo";
import { styleGuide } from "../styles/guide";
import { GET_ROOM_INFO } from "../apollo/queries";
import { RoomsCardProps } from "../types/props";
import { HomeScreenNavigationProp } from "../types/type";

export default function RoomsCard({ id }: RoomsCardProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId: id,
    },
    pollInterval: 2000,
  });
  const [thrownError, setThrownError] = useState<any>(null);
  const [isRead, setIsRead] = useState(true);
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
  });
  const focused = useIsFocused();

  useEffect(() => {
    const readStorage = async () => {
      try {
        const lastReadMessageId = await AsyncStorage.getItem(id);
        if (lastReadMessageId === data.room.messages[0].id) {
          setIsRead(false);
        } else {
          setIsRead(true);
        }
      } catch (err) {
        setThrownError(err);
      }
    };
    if (focused && data) {
      readStorage();
    }
  }, [data, focused]);

  const handlePress = () => {
    navigation.navigate("Chat", {
      roomId: id,
    });
  };

  if (!fontLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={
          isRead
            ? styles.container
            : { ...styles.container, ...styles.containerUnread }
        }
      >
        <View style={styles.avatar}>
          <ProfileIcon />
        </View>
        {loading && <ActivityIndicator />}
        {data && data.room && (
          <View style={styles.textContainer}>
            {isRead ? (
              <Text style={styles.time}>
                {getTimeAgo(data.room.messages[0].insertedAt)}
              </Text>
            ) : (
              <View style={styles.dotContainer}>
                <DotIcon />
              </View>
            )}

            <Text
              numberOfLines={1}
              style={
                isRead
                  ? styles.title
                  : { ...styles.title, ...styles.titleUnread }
              }
            >
              {data.room.name}
            </Text>
            <Text
              numberOfLines={1}
              style={
                isRead
                  ? styles.lastMessage
                  : { ...styles.lastMessage, ...styles.lastMessageUnread }
              }
            >
              {data.room.messages[0].body}
            </Text>
          </View>
        )}
        {(error || thrownError) && (
          <CustomModal>
            <Text>{error?.message || thrownError.message}</Text>
          </CustomModal>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    backgroundColor: styleGuide.color.white,
    ...styleGuide.corner.sm,
  },
  containerUnread: {
    backgroundColor: styleGuide.color.plum["500"],
  },
  avatar: {
    paddingTop: 10,
  },
  time: {
    textAlign: "right",
    color: styleGuide.color.gray["500"],
    ...styleGuide.text.caption,
  },
  dotContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  textContainer: {
    width: "80%",
    flexGrow: 1,
  },
  title: {
    color: styleGuide.color.black,
    ...styleGuide.text.heading["3"],
  },
  titleUnread: {
    color: styleGuide.color.white,
  },
  lastMessage: {
    color: styleGuide.color.black,
    ...styleGuide.text.body,
  },
  lastMessageUnread: {
    color: styleGuide.color.white,
  },
});
