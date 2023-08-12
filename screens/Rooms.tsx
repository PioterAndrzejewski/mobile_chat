import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp, HomeStackNavigatorParamList } from "../type";

export default function RoomsScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Rooms are here</Text>
      <Button title='Click here' onPress={() => navigation.navigate("Chat")} />
    </View>
  );
}
