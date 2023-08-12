import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoomsCard from "../Components/RoomCard";
import { GET_ROOMS } from "../apollo/queries";
import { styleGuide } from "../styles/guide";

const USER_ID = "f58cc17e-7917-48f4-8a93-46642cf890c4";

export default function RoomsScreen() {
  const { loading, error, data } = useQuery(GET_ROOMS);
  useEffect(() => {
    const setUserId = async () => {
      try {
        const value = await AsyncStorage.setItem("userId", USER_ID);
      } catch (error) {
        console.log(error);
      }
    };
    setUserId();
  }, [data]);

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
