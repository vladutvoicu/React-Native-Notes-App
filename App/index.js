import React, { useEffect } from "react";
import Navigation from "./config/navigation";
import { authentication } from "./config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.disableYellowBox = true;

export default () => {
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("keepLoggedIn");
        if (value == "false") {
          authentication.signOut();
          await AsyncStorage.setItem("userId", "");
          await AsyncStorage.setItem("categoriesId", "");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };

    _retrieveData();
  }, []);
  return <Navigation />;
};
