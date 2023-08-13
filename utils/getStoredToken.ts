import AsyncStorage from "@react-native-async-storage/async-storage";
export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token !== null) {
      return token;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
