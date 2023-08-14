import React from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

import { styleGuide } from "../styles/guide";

export default function AppLoading() {
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator size='large' />;
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 20,
    backgroundColor: styleGuide.color.blue["300"],
  },
});
