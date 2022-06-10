import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authentication from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "../screens/Home";
import AddNote from "../screens/AddNote";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Reset from "../screens/Reset";

const Stack = createNativeStackNavigator();

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <>
          <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddNote"
              component={AddNote}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reset"
              component={Reset}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};
