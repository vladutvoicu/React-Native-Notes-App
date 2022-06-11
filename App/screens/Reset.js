import React, { useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
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
        <Text style={{ fontSize: 40, color: colors.white, fontWeight: "bold" }}>
          Reset Password
        </Text>
      </View>
      <View style={styles.authContainer}>
        <Text style={{ fontSize: 16, textAlign: "center", top: 30 }}>
          Enter your email address and we'll send you a link to reset your
          password
        </Text>
        <View style={styles.authInputContainer}>
          <AuthInput
            icon={"mail"}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            top: "10%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RoundedButton text={"Submit"} />
        </View>
      </View>
    </View>
  );
};
