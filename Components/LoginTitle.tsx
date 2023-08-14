import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import { styleGuide } from "../styles/guide";

export default function LoginTitle({ title }: { title: string }) {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
  });

  return fontLoaded ? (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
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
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.blue["300"],
  },
  header: {
    ...styleGuide.text.heading["1"],
    color: styleGuide.color.plum["500"],
  },
});