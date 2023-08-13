import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
import { termsAndConditions, privacyPolicy } from "../assets/dummyText";

export type Credentials =
  | "email"
  | "firstName"
  | "lastName"
  | "password"
  | "passwordConfirmation";

export default function RegisterPanel() {
  const [credentials, setCredentials] = useState({
    email: "prefilled@email.com",
    firstName: "prefilled name",
    lastName: "prefilled surname",
    password: "prefilled password",
    passwordConfirmation: "prefilled password",
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
  const [termsOpened, setTermsOpened] = useState(false);
  const [policyOpened, setPolicyOpened] = useState(false);

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
      setUserToStorage(
        loginUserData.data.loginUser.user.id,
        loginUserData.data.loginUser.token,
      );
      navigation.navigate("Rooms");
    }
  }, [loginUserData]);

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
      <ScrollView>
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
          <View style={styles.privacyRow}>
            <Text style={styles.caption}>By signing up you agree with </Text>
          </View>
          <View style={styles.privacyRow}>
            <TouchableOpacity onPress={() => setTermsOpened(true)}>
              <Text style={styles.captionLink}>Terms and Conditions</Text>
            </TouchableOpacity>

            <Text style={styles.caption}> and </Text>
            <TouchableOpacity onPress={() => setPolicyOpened(true)}>
              <Text style={styles.captionLink}>Privacy Policy.</Text>
            </TouchableOpacity>
          </View>
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
        {termsOpened && (
          <CustomModal onClose={() => setTermsOpened(false)}>
            <Text style={styles.documentTitle}>Terms and conditions</Text>
            <Text style={styles.documentBody}>{termsAndConditions}</Text>
          </CustomModal>
        )}
        {policyOpened && (
          <CustomModal onClose={() => setPolicyOpened(false)}>
            <Text style={styles.documentTitle}>Privacy policy</Text>
            <Text style={styles.documentBody}>{privacyPolicy}</Text>
          </CustomModal>
        )}
      </ScrollView>
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
  privacy: {
    marginTop: 16,
  },
  privacyRow: {
    ...styleGuide.center,
  },
  caption: {
    color: styleGuide.color.white,
    ...styleGuide.text.caption,
  },
  captionLink: {
    textDecorationLine: "underline",
    color: styleGuide.color.blue["500"],
    ...styleGuide.text.caption,
  },
  hasAccount: {
    color: styleGuide.color.white,
    ...styleGuide.text.body,
  },
  signUpContainer: {
    marginTop: 20,
    ...styleGuide.center,
  },
  signIn: {
    marginLeft: 12,
    color: styleGuide.color.plum["500"],
    ...styleGuide.text.body,
  },
  documentTitle: {
    marginBottom: 30,
    ...styleGuide.text.heading["3"],
  },
  documentBody: {
    ...styleGuide.text.body,
  },
});
