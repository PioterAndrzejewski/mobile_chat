import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackNavigatorParamList } from "./types/type";

import ChatScreen from "./screens/Chat";
import RoomsScreen from "./screens/Rooms";
import LoginScreen from "./screens/Login";
import RoomsTitle from "./Components/RoomsTitle";
import ChatTitle from "./Components/ChatTitle";
import LoginTitle from "./Components/LoginTitle";

import { API_URL, API_TOKEN } from "@env";
import { getStoredToken } from "./utils/getStoredToken";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const storedToken = await getStoredToken();
  return {
    headers: {
      ...headers,
      authorization: storedToken
        ? `Bearer ${storedToken}`
        : `Bearer ${API_TOKEN}`,
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
            name='Login'
            component={LoginScreen}
            options={{ header: () => <LoginTitle title='Welcome back' /> }}
          />
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
