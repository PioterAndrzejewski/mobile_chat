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
import { LOGIN_USER, REGISTER_USER } from "../apollo/queries";

type Credentials =
  | "email"
  | "firstName"
  | "lastName"
  | "password"
  | "passwordConfirmation";

export default function RegisterPanel() {
  const [credentials, setCredentials] = useState({
    email: "a@a.pl",
    firstName: "and",
    lastName: "ande",
    password: "password1",
    passwordConfirmation: "password1",
  });
  const [registerUser, { data, error, loading }] = useMutation(REGISTER_USER, {
    errorPolicy: "all",
  });
  const [loginUser, loginUserData] = useMutation(LOGIN_USER, {
    errorPolicy: "all",
  });
  const [fontLoaded] = useFonts({
    SFCompact: require("../assets/fonts/SFCompact.ttf"),
    PoppinsBold: require("../assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("../assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("../assets/fonts/PoppinsRegular.ttf"),
  });
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const updateCredentials = (
    newValue: string,
    field: Credentials | undefined,
  ) =>
    setCredentials((prevValue) => {
      const newCredentials = { ...prevValue };
      if (field) {
        newCredentials[field] = newValue;
      }
      return newCredentials;
    });

  const handleRegister = () => {
    try {
      registerUser({
        variables: {
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          password: credentials.password,
          passwordConfirmation: credentials.passwordConfirmation,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data && data.registerUser) {
      console.log(data);
      loginUser({
        variables: {
          email: data.registerUser.email,
          password: credentials.password,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (loginUserData.data && loginUserData.data.loginUser) {
      console.log(loginUserData.data);
      setUserToStorage(
        loginUserData.data.loginUser.user.id,
        loginUserData.data.loginUser.token,
      );
      navigation.navigate("Rooms");
    }
  }, [loginUserData]);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  const inputs = [
    {
      label: "e-mail address",
      value: credentials.email,
      field: "email",
    },
    {
      label: "first name",
      value: credentials.firstName,
      field: "firstName",
    },
    {
      label: "last name",
      value: credentials.lastName,
      field: "lastName",
    },
    {
      label: "password",
      value: credentials.password,
      field: "password",
      others: { secure: true },
    },
    {
      label: "password confirmation",
      value: credentials.passwordConfirmation,
      field: "passwordConfirmation",
      others: { secure: true },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {!fontLoaded && <ActivityIndicator size='large' />}
        {inputs.map((input) => (
          <CustomTextInput
            label={input.label}
            onChange={updateCredentials}
            value={input.value}
            field={input.field}
            {...input.others}
            key={input.label}
          />
        ))}

        {loading || loginUserData.loading ? (
          <ActivityIndicator size='large' />
        ) : (
          <Button label='Sign up' onClick={handleRegister} />
        )}
      </View>
      <View style={styles.privacy}>
        <Text style={styles.caption}>By signing up you agree with</Text>
        <Text style={styles.captionLink}>Terms and Conditions</Text>
        <Text style={styles.caption}>and</Text>
        <Text style={styles.captionLink}>Privacy Policy.</Text>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.hasAccount}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signIn}>Log in</Text>
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
    paddingTop: 20,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.blue["300"],
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  signUpContainer: {
    marginVertical: 80,
    ...styleGuide.center,
  },
  hasAccount: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  signIn: {
    marginLeft: 12,
    color: styleGuide.color.plum["500"],
    ...styleGuide.text.body,
  },
});
