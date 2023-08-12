import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/type";

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <Button
        title='Enter rooms here'
        onPress={() => navigation.navigate("Rooms")}
      />
    </View>
  );
}
