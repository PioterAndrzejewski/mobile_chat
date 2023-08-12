import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp, HomeStackNavigatorParamList } from "../type";

const rooms = [
  {
    id: 12,
    name: "yes",
  },
  {
    id: 321,
    name: "yfdsaes",
  },
  {
    id: 124,
    name: "yedfsa",
  },
];

export default function RoomsScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
      <Text>Rooms are here</Text>
      {rooms.map((room) => (
        <Button
          title={room.name}
          onPress={() => navigation.navigate("Chat")}
          key={room.id}
        />
      ))}
    </View>
  );
}
