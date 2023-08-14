import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
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
  const [validation, setValidation] = useState({
    email: {
      isTouched: false,
      error: "",
    },
    firstName: {
      isTouched: false,
      error: "",
    },
    lastName: {
      isTouched: false,
      error: "",
    },
    password: {
      isTouched: false,
      error: "",
    },
    passwordConfirmation: {
      isTouched: false,
      error: "",
    },
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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updateCredentials = (
    newValue: string,
    field: Credentials | undefined,
  ) => {
    let error = "";
    let clearPasswordError = false;
    switch (field) {
      case "email":
        if (!newValue.includes("@")) {
          error = "Email is wrong";
        }
        break;
      case "firstName":
        if (newValue.trim().length < 3) {
          error = "First name is too short";
        }
        break;
      case "lastName":
        if (newValue.trim().length < 3) {
          error = "Last name is too short";
        }
        break;
      case "password":
        if (newValue !== credentials.passwordConfirmation) {
          error = "Passwords are not the same";
        }
        if (newValue.length < 8) {
          error = "Password is too short";
        }
        if (newValue === credentials.passwordConfirmation) {
          clearPasswordError = true;
        }
        break;
      case "passwordConfirmation":
        if (newValue !== credentials.password) {
          error = "Passwords are not the same";
        }
        if (newValue === credentials.password) {
          clearPasswordError = true;
        }
        break;
    }
    setButtonDisabled(false);
    setCredentials((prevValue) => {
      const newCredentials = JSON.parse(JSON.stringify(prevValue));
      if (field) {
        newCredentials[field] = newValue;
      }
      return newCredentials;
    });
    setValidation((prevValidation) => {
      const newValidation = JSON.parse(JSON.stringify(prevValidation));
      newValidation[field!].isTouched = true;
      if (clearPasswordError) {
        newValidation.password.error = "";
        newValidation.passwordConfirmation.error = "";
      }
      if (
        error === "Passwords are not the same" &&
        newValidation.password.isTouched &&
        newValidation.passwordConfirmation.isTouched
      ) {
        newValidation.password.error = error;
        newValidation.passwordConfirmation.error = error;
        return newValidation;
      } else if (error === "Passwords are not the same") {
        newValidation.password.error = "";
        newValidation.passwordConfirmation.error = "";
        return newValidation;
      }
      newValidation[field!].error = error;
      return newValidation;
    });
    console.log(validation);
  };

  const handleRegister = () => {
    for (const credential in credentials) {
      if (validation[credential as Credentials].error !== "") {
        setButtonDisabled(true);
        return;
      }
    }
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
      error: validation.email.error,
      touched: validation.email.isTouched,
    },
    {
      label: "first name",
      value: credentials.firstName,
      field: "firstName",
      error: validation.firstName.error,
      touched: validation.firstName.isTouched,
    },
    {
      label: "last name",
      value: credentials.lastName,
      field: "lastName",
      error: validation.lastName.error,
      touched: validation.lastName.isTouched,
    },
    {
      label: "password",
      value: credentials.password,
      field: "password",
      others: { secure: true },
      error: validation.password.error,
      touched: validation.password.isTouched,
    },
    {
      label: "password confirmation",
      value: credentials.passwordConfirmation,
      field: "passwordConfirmation",
      others: { secure: true },
      error: validation.passwordConfirmation.error,
      touched: validation.passwordConfirmation.isTouched,
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
              field={input.field as Credentials}
              {...input.others}
              error={input.error}
              isTouched={input.touched}
              key={input.label}
            />
          ))}
          {loading || loginUserData.loading ? (
            <ActivityIndicator size='large' />
          ) : (
            <Button
              label='Sign up'
              onClick={handleRegister}
              disabled={buttonDisabled}
            />
          )}
        </View>
        <View style={styles.privacy}>
          <View style={styles.privacyRow}>
            <Text style={styles.caption}>By signing up you agree with </Text>
          </View>
          <View style={styles.privacyRow}>
            <TouchableOpacity onPress={() => setTermsOpened(true)} hitSlop={20}>
              <Text style={styles.captionLink}>Terms and Conditions</Text>
            </TouchableOpacity>

            <Text style={styles.caption}> and </Text>
            <TouchableOpacity
              onPress={() => setPolicyOpened(true)}
              hitSlop={20}
            >
              <Text style={styles.captionLink}>Privacy Policy.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.hasAccount}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            hitSlop={20}
          >
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
    ...(styleGuide.center as ViewStyle),
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
    ...(styleGuide.center as ViewStyle),
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
