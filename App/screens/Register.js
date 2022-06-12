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
import { createUserWithEmailAndPassword } from "firebase/auth";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  const signUp = () => {
    if (password == reEnteredPassword) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(() => {
          Alert.alert("Succesful Registration", "Account was created!"),
            navigation.navigate("Login");
        })
        .catch((error) => Alert.alert("Something went wrong", `Invalid email`));
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
