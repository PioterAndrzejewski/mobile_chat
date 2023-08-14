import AsyncStorage from "@react-native-async-storage/async-storage";
export const setUserToStorage = async (userId: string, token: string) => {
  try {
    await AsyncStorage.setItem("userId", userId);
    await AsyncStorage.setItem("authToken", token);
  } catch (err) {
    console.log(err);
    return null;
  }
};
