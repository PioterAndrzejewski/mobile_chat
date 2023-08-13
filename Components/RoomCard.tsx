import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styleGuide } from "../styles/guide";
import { DotIcon, ProfileIcon } from "./SvgIcons";
import { GET_ROOM_INFO } from "../apollo/queries";
import { HomeScreenNavigationProp } from "../types/type";
import { getTimeAgo } from "../utils/getTimeAgo";

type RoomsCardProps = {
  id: string;
};

export default function RoomsCard({ id }: RoomsCardProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId: id,
    },
    pollInterval: 2000,
  });
  const [isRed, setIsRed] = useState(true);
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
  });
  const focused = useIsFocused();

  if (error) {
    return <Text>There was an error...</Text>;
  }

  useEffect(() => {
    const readStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(data.room.messages[0].id);
        if (value !== "red") {
          setIsRed(false);
        } else {
          setIsRed(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (focused) {
      readStorage();
    }
  }, [data, focused]);

  const handlePress = () => {
    navigation.navigate("Chat", {
      roomId: id,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={
          isRed
            ? styles.container
            : { ...styles.container, ...styles.containerUnread }
        }
      >
        <View style={styles.avatar}>
          <ProfileIcon />
        </View>

        {data && fontLoaded && (
          <View style={styles.textContainer}>
            {isRed ? (
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
                isRed
                  ? styles.title
                  : { ...styles.title, ...styles.titleUnread }
              }
            >
              {data.room.name}
            </Text>
            <Text
              numberOfLines={1}
              style={
                isRed
                  ? styles.lastMessage
                  : { ...styles.lastMessage, ...styles.lastMessageUnread }
              }
            >
              {data.room.messages[0].body}
            </Text>
          </View>
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
