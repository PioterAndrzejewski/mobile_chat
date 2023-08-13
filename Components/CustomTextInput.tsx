import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

import { SendIcon, VisionIcon, VisionLowIcon } from "./SvgIcons";
import { styleGuide } from "../styles/guide";
import { Credentials } from "./RegisterPanel";

type CustomTextInputProps = {
  label: string;
  secure?: boolean;
  onChange: (a: string, b?: string) => void;
  value: string;
  field?: Credentials | string | undefined;
};

export default function CustomTextInput({
  label,
  secure,
  onChange,
  value,
  field,
}: CustomTextInputProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const [hidden, setHidden] = useState<boolean | undefined>(secure);
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
  });

  const handlePress = () => setHidden((prevValue) => !prevValue);

  const showPassword = () => (
    <View style={styles.icon}>
      <TouchableOpacity onPress={handlePress}>
        {hidden ? <VisionLowIcon /> : <VisionIcon />}
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <View>
          <TextInput
            style={
              inputFocused
                ? { ...styles.input, ...styles.inputFocused }
                : styles.input
            }
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChangeText={(value) => onChange(value, field)}
            value={value}
            editable
            secureTextEntry={secure && hidden}
          />
          {secure && showPassword()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 4,
    color: styleGuide.color.white,
    ...styleGuide.text.label,
  },
  input: {
    width: "100%",
    height: 47,
    paddingHorizontal: 20,
    ...styleGuide.corner.sm,
    ...styleGuide.text.title,
    backgroundColor: styleGuide.color.white,
  },
  inputFocused: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: styleGuide.color.plum["500"],
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
});
