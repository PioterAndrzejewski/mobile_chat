import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { SendIcon } from "./SvgIcons";
import { styleGuide } from "../styles/guide";
import { CustomInputProps } from "../types/props";

export default function CustomInputToolbar({
  containerStyle,
  loading,
  onSend,
}: CustomInputProps) {
  const [position, setPosition] = useState("absolute");
  const [inputFocused, setInputFocused] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => setPosition("relative"),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => setPosition("absolute"),
    );
    return () => {
      keyboardWillShowListener === null || keyboardWillShowListener === void 0
        ? void 0
        : keyboardWillShowListener.remove();
      keyboardWillHideListener === null || keyboardWillHideListener === void 0
        ? void 0
        : keyboardWillHideListener.remove();
    };
  }, []);

  const handlePress = () => {
    onSend(text);
    setText("");
  };
  return (
    <View
      style={
        { ...styles.container, position: position, containerStyle } as ViewStyle
      }
    >
      <TextInput
        style={
          inputFocused
            ? { ...styles.input, ...styles.inputFocused }
            : styles.input
        }
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onChangeText={(value) => setText(value)}
        value={text}
        onSubmitEditing={handlePress}
        editable
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onPress={handlePress} hitSlop={20}>
          <SendIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: styleGuide.color.blue["300"],
    ...styleGuide.corner.lgT,
  },
  primary: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  accessory: {
    height: 60,
  },
  input: {
    width: "80%",
    height: 42,
    marginRight: 20,
    paddingHorizontal: 20,
    ...styleGuide.corner.smAltR,
    backgroundColor: styleGuide.color.white,
  },
  inputFocused: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: styleGuide.color.plum["500"],
  },
  row: {
    backgroundColor: styleGuide.color.blue["100"],
  },
});
