import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_ROOMS } from "../apollo/queries";
import RoomsCard from "../Components/RoomCard";
import { styleGuide } from "../styles/guide";

export default function RoomsScreen() {
  const { loading, error, data } = useQuery(GET_ROOMS);

  return (
    <View style={styles.container}>
      {!loading &&
        !error &&
        data.usersRooms.rooms.map((room: any) => (
          <RoomsCard id={room.id} key={room.id} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.blue[100],
    height: "100%",
  },
});

/* <Button
title={room.name}
onPress={() =>
  navigation.navigate("Chat", {
    roomId: room.id,
  })
}
key={room.id}
/> */
