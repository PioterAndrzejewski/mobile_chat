import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/type";
import { useQuery } from "@apollo/client";

import { GET_ROOMS } from "../apollo/queries";

export default function RoomsScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOMS);
  return (
    <View>
      {!loading &&
        !error &&
        data.usersRooms.rooms.map((room: any) => (
          <Button
            title={room.name + room.id}
            onPress={() =>
              navigation.navigate("Chat", {
                roomId: room.id,
              })
            }
            key={room.id}
          />
        ))}
      {loading && <Text>Loading rooms...</Text>}
      {error && <Text>There was an error. Please try again later.</Text>}
    </View>
  );
}
