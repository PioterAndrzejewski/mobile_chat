import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp, HomeStackNavigatorParamList } from "../type";

export default function ChatScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chat is here</Text>
      <Button
        title='Back to rooms'
        onPress={() => navigation.navigate("Rooms")}
      />
    </View>
  );
}
