import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { styleGuide } from "../styles/guide";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/type";
import { ArrowIcon, VideoIcon, PhoneIcon, ProfileIcon } from "./SvgIcons";

// can't find a way to define who is is an interlocutor (there is no users in roominfo and no username in message models)
const INTERLOCUTOR = "The Widlarz Group";
const IS_ACTIVE = true;

export default function ChatTitle() {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
  });

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return fontLoaded ? (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Rooms")}
          style={styles.arrowContainer}
        >
          <ArrowIcon />
        </TouchableOpacity>
        <ProfileIcon width={44} height={44} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{INTERLOCUTOR}</Text>
          {IS_ACTIVE && <Text style={styles.active}>Active Now</Text>}
        </View>
        <View style={styles.iconsContainer}>
          <VideoIcon />
          <View style={styles.utterIcon}>
            <PhoneIcon />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: styleGuide.color.blue[100],
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.blue["300"],
    ...styleGuide.corner.lg,
  },
  arrowContainer: {
    marginRight: 10,
    paddingTop: 10,
  },
  textContainer: {
    marginLeft: 10,
    flexGrow: 1,
  },
  title: {
    color: styleGuide.color.plum["500"],
    ...styleGuide.text.heading["4"],
  },
  active: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  utterIcon: {
    marginLeft: 10,
  },
});
