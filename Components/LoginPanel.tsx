import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/client";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import Button from "../Components/Button";
import CustomModal from "./CustomModal";
import CustomTextInput from "./CustomTextInput";

import { styleGuide } from "../styles/guide";
import { setUserToStorage } from "../utils/setUserToStorage";
import { HomeScreenNavigationProp } from "../types/type";
import { LOGIN_USER } from "../apollo/queries";

export default function LoginPanel() {
  const [email, setEmail] = useState("cameron.tucker@mail.com");
  const [password, setPassword] = useState("pgUBZ6YJlJYhTTH");
  const [loginUser, { data, error, loading }] = useMutation(LOGIN_USER, {
    errorPolicy: "all",
  });
  const [fontLoaded] = useFonts({
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
  });
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const updateEmail = (newValue: string) => setEmail(newValue);
  const updatePassword = (newValue: string) => setPassword(newValue);

  const handleLogin = () => {
    try {
      loginUser({
        variables: {
          email,
          password,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data && data.loginUser) {
      setUserToStorage(data.loginUser.user.id, data.loginUser.token);
      navigation.navigate("Rooms");
    }
  }, [data]);

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
        {loading ? (
          <ActivityIndicator size='large' />
        ) : (
          <Button label='Log in' onClick={handleLogin} />
        )}
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <CustomModal>
          <Text>{error.message}</Text>
        </CustomModal>
      )}
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
    marginVertical: 80,
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
