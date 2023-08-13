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
import { HomeStackNavigatorParamList } from "./types/type";

import ChatScreen from "./screens/Chat";
import RoomsScreen from "./screens/Rooms";
import RoomsTitle from "./Components/RoomsTitle";
import ChatTitle from "./Components/ChatTitle";

import { API_URL, API_TOKEN } from "@env";

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
            options={{ header: () => <ChatTitle /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
