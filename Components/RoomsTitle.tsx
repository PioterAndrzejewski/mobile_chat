import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styleGuide } from "../styles/guide";
import { useFonts } from "expo-font";
import { SearchIcon, RoomsIcon } from "./SvgIcons";

export default function RoomsTitle() {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
  });

  return fontLoaded ? (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <Text style={styles.header}>Rooms</Text>
        <View style={styles.iconsContainer}>
          <SearchIcon />
          <View style={styles.utterIcon}>
            <RoomsIcon />
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
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  utterIcon: {
    marginLeft: 10,
  },
  header: {
    ...styleGuide.text.heading["1"],
    color: styleGuide.color.plum["500"],
  },
});
