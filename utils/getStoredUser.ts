import AsyncStorage from "@react-native-async-storage/async-storage";
export const getStoredUser = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (userId !== null) {
      return userId;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
