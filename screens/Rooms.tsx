import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RoomsCard from "../Components/RoomCard";

import { styleGuide } from "../styles/guide";
import { GET_ROOMS, GetRoomsType, RoomData } from "../apollo/queries";

const USER_ID = "f58cc17e-7917-48f4-8a93-46642cf890c4";

export default function RoomsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ROOMS);
  const [rooms, setRooms] = useState<null | RoomData[]>(null);
  useEffect(() => {
    const setUserId = async () => {
      try {
        await AsyncStorage.setItem("userId", USER_ID);
      } catch (error) {
        console.log(error);
      }
    };
    setUserId();
  }, []);

  useEffect(() => {
    if (data) {
      setRooms(data.usersRooms.rooms);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      console.log("refetching in Rooms");
    }
  }, [loading]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    const { data }: GetRoomsType = await refetch();
    setRooms(data.usersRooms.rooms);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {rooms &&
          rooms.map((room: any) => <RoomsCard key={room.id} id={room.id} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.blue[100],
    height: "100%",
  },
});
