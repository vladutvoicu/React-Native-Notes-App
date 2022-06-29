import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { authentication } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

export default ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = () => {
    if (password == reEnteredPassword && username != "") {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(() => {
          updateProfile(authentication.currentUser, {
            displayName: username,
          })
            .then(async () => {
              try {
                const docUserRef = await addDoc(collection(db, "users"), {
                  user: email,
                });
                const docCategoriesRef = await addDoc(
                  collection(db, "users", docUserRef.id, "categories"),
                  {
                    Personal: [],
                    Study: [],
                    Work: [],
                  }
                );
                _storeData("userId", docUserRef.id);
                _storeData("categoriesId", docCategoriesRef.id);
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => console.log(error));
          _storeData("keepLoggedIn", "true");
        })
        .catch((error) => Alert.alert("Something went wrong", `Invalid email`));
    } else if (username == "") {
      Alert.alert("Something went wrong", "You must enter an username!");
    } else {
      Alert.alert("Something went wrong", "Passwords must be the same!");
    }
  };

  //
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  setBackgroundColorAsync(`${colors.white}`);
  setButtonStyleAsync("dark");
  //
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.backChevron}
        onPress={() => navigation.navigate("Login")}
      >
        <Entypo name="chevron-down" size={50} color={colors.white} />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/backgroundimage.jpg")}
        style={styles.loginBackgroundImage}
      />
      <View style={styles.loginHeader}>
        <Text style={{ fontSize: 50, color: colors.white, fontWeight: "bold" }}>
          Register
        </Text>
      </View>
      <View style={styles.authContainer}>
        <View style={styles.authInputContainer}>
          <AuthInput
            icon={"user"}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <AuthInput
            icon={"mail"}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <AuthInput
            icon={"lock"}
            placeholder="Password"
            password={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <AuthInput
            icon={"lock"}
            placeholder="Password"
            password={true}
            value={reEnteredPassword}
            onChangeText={(text) => setReEnteredPassword(text)}
          />
        </View>
        <View
          style={{
            top: "15%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RoundedButton text={"Register"} onPress={signUp} />
        </View>
      </View>
    </View>
  );
};
