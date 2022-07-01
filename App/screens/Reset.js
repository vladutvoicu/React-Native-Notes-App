import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { authentication } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

const windowWidth = Dimensions.get("window").width;

export default ({ navigation }) => {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        Alert.alert(
          "Email Sent",
          "You will recieve a email with a link to reset your password. It may take a few minutes to recieve the email (check in spam also)."
        ),
          navigation.navigate("Login");
      })
      .catch((error) =>
        Alert.alert(
          "Something went wrong",
          "Email not associated with any account"
        )
      );
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
        <Text
          style={{
            fontSize: 0.1 * windowWidth,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          Reset Password
        </Text>
      </View>
      <View style={styles.authContainer}>
        <Text
          style={{ fontSize: 0.04 * windowWidth, textAlign: "center", top: 30 }}
        >
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
          <RoundedButton text={"Submit"} onPress={resetPassword} />
        </View>
      </View>
    </View>
  );
};
