import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import Button from "../Components/Button";

import { styleGuide } from "../styles/guide";
import { GET_ROOM_INFO } from "../apollo/queries";
import { HomeScreenNavigationProp } from "../types/type";
import CustomTextInput from "./CustomTextInput";

export default function LoginPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOM_INFO, {
    variables: {
      roomId: "yes",
    },
  });
  const [fontLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log({
      email,
      password,
    });
  }, [password, email]);

  const updateEmail = (newValue: string) => setEmail(newValue);
  const updatePassword = (newValue: string) => setPassword(newValue);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in and stay in touch with everyone!</Text>
      <View style={styles.innerContainer}>
        <View>
          <CustomTextInput
            label='e-mail address'
            onChange={updateEmail}
            value={email}
          />
          <CustomTextInput
            label='password'
            onChange={updatePassword}
            value={password}
            secure
          />
        </View>
        <Button label='Log in' />
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <Text style={styles.signUp}>Sign up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.blue["300"],
  },
  title: {
    color: styleGuide.color.white,
    ...styleGuide.text.heading["2"],
  },
  innerContainer: {
    marginTop: 36,
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  signUpContainer: {
    marginVertical: 30,
    ...styleGuide.center,
  },
  noAccount: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  signUp: {
    marginLeft: 12,
    color: styleGuide.color.plum["500"],
    ...styleGuide.text.body,
  },
});
