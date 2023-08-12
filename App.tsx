import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomsTitle from "./Components/RoomsTitle";

import { API_URL, API_TOKEN } from "@env";

import ChatScreen from "./screens/Chat";
import RoomsScreen from "./screens/Rooms";
import { HomeStackNavigatorParamList } from "./types/type";
import { useFonts } from "expo-font";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = API_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function App() {
  const [_] = useFonts({
    PoppinsBold: require("./assets/fonts/PoppinsBold.ttf"),
    PoppinsRegular: require("./assets/fonts/PoppinsRegular.ttf"),
    PoppinsMedium: require("./assets/fonts/PoppinsMedium.ttf"),
    PoppinsSemiBold: require("./assets/fonts/PoppinsSemiBold.ttf"),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Rooms'
            component={RoomsScreen}
            options={{ header: () => <RoomsTitle /> }}
          />
          <Stack.Screen
            name='Chat'
            component={ChatScreen}
            initialParams={{ roomId: "abc" }}
            options={{ headerTitle: () => <RoomsTitle /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
