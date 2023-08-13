import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { styleGuide } from "../styles/guide";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function CustomTextInput({ label, onClick }: ButtonProps) {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
  });
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 14,
    backgroundColor: styleGuide.color.plum["500"],
    ...styleGuide.center,
    ...styleGuide.corner.sm,
  },
  label: {
    color: styleGuide.color.white,
    ...styleGuide.text.button,
  },
});
