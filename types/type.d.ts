/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Rooms: undefined;
  Chat: {
    roomId: string;
    navigation: any;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Rooms,
  Chat
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, Chat>;
