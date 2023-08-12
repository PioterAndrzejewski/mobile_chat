import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { styleGuide, topBarStyle } from "../styles/guide";
import { useFonts } from "expo-font";
import { SearchIcon, RoomsIcon } from "./SvgIcons";

export default function RoomsTitle() {
  const [_] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rooms</Text>
      <View style={styles.iconsContainer}>
        <SearchIcon />
        <View style={styles.utterIcon}>
          <RoomsIcon />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
