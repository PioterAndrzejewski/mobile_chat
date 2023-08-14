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
import { RoomFullData } from "../apollo/types";

export default function RoomsCard({ id, trigger }: RoomsCardProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data, refetch } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId: id,
    },
  });
  const [thrownError, setThrownError] = useState<any>(null);
  const [isRead, setIsRead] = useState(true);
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
  });
  const [roomData, setRoomData] = useState<RoomFullData | null>(null);
  const focused = useIsFocused();

  useEffect(() => {
    const onRefresh = async () => {
      const { data } = await refetch();
      if (data && data.room) {
        setRoomData(data.room);
      }
    };
    onRefresh();
  }, [trigger]);

  useEffect(() => {
    if (data && data.room) {
      setRoomData(data.room);
    }
  }, [data]);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const lastReadMessageId = await AsyncStorage.getItem(id);
        if (lastReadMessageId === roomData!.messages[0].id) {
          setIsRead(true);
        } else {
          setIsRead(false);
        }
      } catch (err) {
        setThrownError(err);
      }
    };
    if (focused && roomData) {
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
        {roomData && (
          <View style={styles.textContainer}>
            {isRead ? (
              <Text style={styles.time}>
                {getTimeAgo(roomData.messages[0].insertedAt)}
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
              {roomData.name}
            </Text>
            <Text
              numberOfLines={1}
              style={
                isRead
                  ? styles.lastMessage
                  : { ...styles.lastMessage, ...styles.lastMessageUnread }
              }
            >
              {roomData.messages[0].body}
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
