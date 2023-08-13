import React, { useState, useEffect, useCallback } from "react";
import { IMessage } from "react-native-gifted-chat";
import { View, Text, StyleSheet } from "react-native";
import { styleGuide } from "../styles/guide";
import { DotIcon, ProfileIcon } from "./SvgIcons";

type CustomMessageProps = {
  userId: string | null;
  interlocutorTyping: boolean;
  message: IMessage | null | undefined;
};

export default function CustomMessage({
  message,
  userId,
  interlocutorTyping,
}: CustomMessageProps) {
  if (interlocutorTyping) {
    return (
      <View style={styles.dotsRow}>
        <View style={styles.avatarContainer}>
          <ProfileIcon width={24} height={24} />
        </View>
        <View style={styles.dotsContainer}>
          <DotIcon color={styleGuide.color.blue["300"]} />
          <DotIcon color={styleGuide.color.blue["300"]} />
          <DotIcon color={styleGuide.color.blue["300"]} />
        </View>
      </View>
    );
  }

  const isUsers = message && userId === message.user._id;
  return (
    <View style={isUsers ? { ...styles.row, ...styles.rowUsers } : styles.row}>
      {interlocutorTyping && <ProfileIcon width={24} height={24} />}
      <View
        style={
          isUsers
            ? { ...styles.container, ...styles.containerUser }
            : styles.container
        }
      >
        <Text
          style={
            isUsers ? { ...styles.text, ...styles.textUsers } : styles.text
          }
        >
          {message && message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  rowUsers: {
    justifyContent: "flex-end",
  },
  avatarContainer: {
    paddingTop: 24,
  },
  dotsContainer: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 70,
    marginHorizontal: 20,
    padding: 14,
    ...styleGuide.corner.smAltL,
    backgroundColor: styleGuide.color.white,
  },
  container: {
    width: "64%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 12,
    marginLeft: 70,
    padding: 14,
    ...styleGuide.corner.smAltL,
    backgroundColor: styleGuide.color.white,
  },
  containerUser: {
    backgroundColor: styleGuide.color.plum["300"],
    ...styleGuide.corner.smAltR,
  },
  text: {
    ...styleGuide.text.body,
    color: styleGuide.color.black,
  },
  textUsers: {
    color: styleGuide.color.white,
  },
});
