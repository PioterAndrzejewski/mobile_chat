import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/type";
import { useQuery } from "@apollo/client";

import { GET_ROOMS } from "../apollo/queries";
import RoomsCard from "../Components/RoomCard";

export default function RoomsScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { loading, error, data } = useQuery(GET_ROOMS);

  // It would be reasonable to store info in database about unread messages, so I'll just assume something is unread for styling
  return (
    <View>
      {!loading &&
        !error &&
        data.usersRooms.rooms.map((room: any) => (
          <RoomsCard id={room.id} isUnread />
        ))}
      {loading && <Text>Loading rooms...</Text>}
      {error && <Text>There was an error. Please try again later.</Text>}
    </View>
  );
}

{
  /* <Button
title={room.name}
onPress={() =>
  navigation.navigate("Chat", {
    roomId: room.id,
  })
}
key={room.id}
/> */
}
