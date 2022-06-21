import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authentication } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Note from "../screens/Note";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Reset from "../screens/Reset";
import CustomDrawer from "../components/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authentication, (data) => {
      if (data != null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const _Home = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        useLegacyImplementation={true}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <>
          <Stack.Navigator screenOptions={{ animation: "slide_from_bottom" }}>
            <Stack.Screen
              name="_Home"
              component={_Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Note"
              component={Note}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator screenOptions={{ animation: "slide_from_bottom" }}>
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
