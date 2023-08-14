import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Text,
} from "react-native";
import { useQuery } from "@apollo/client";

import RoomsCard from "../Components/RoomCard";
import CustomModal from "../Components/CustomModal";

import { styleGuide } from "../styles/guide";
import { GET_ROOMS, GetRoomsType, RoomData } from "../apollo/queries";

export default function RoomsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ROOMS, {
    pollInterval: 5000,
  });
  const [rooms, setRooms] = useState<null | RoomData[]>(null);

  useEffect(() => {
    if (data) {
      setRooms(data.usersRooms.rooms);
    }
  }, [data]);

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
        {loading && <ActivityIndicator size='large' />}
        {rooms &&
          rooms.map((room: any) => <RoomsCard key={room.id} id={room.id} />)}
        {rooms?.length === 0 && (
          <CustomModal>
            <Text>
              There are no rooms to show. Something went wrong, or you are not
              assigned to any rooms.
            </Text>
          </CustomModal>
        )}
        {error && (
          <CustomModal>
            <Text>{error.message}</Text>
          </CustomModal>
        )}
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
