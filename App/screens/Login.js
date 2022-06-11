import React, { useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

export default ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setChecked = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
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
      <Image
        source={require("../assets/images/backgroundimage.jpg")}
        style={styles.loginBackgroundImage}
      />
      <View style={styles.loginHeader}>
        <Image
          source={require("../assets/images/noteslogo.png")}
          style={{ resizeMode: "contain", height: "40%", width: "40%" }}
        />
        <Text style={{ fontSize: 50, color: colors.white, fontWeight: "bold" }}>
          Notes App
        </Text>
      </View>
      <View style={styles.authContainer}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.lightBlue,
                fontWeight: "bold",
              }}
            >
              Register now
            </Text>
          </TouchableOpacity>
        </View>
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
            value={password}
            password={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ width: "80%", top: "10%", flexDirection: "row" }}>
          <View
            style={{
              position: "absolute",
              left: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={setChecked}
              activeOpacity={0.8}
            >
              <Checkbox
                style={{ borderColor: colors.lightBlue }}
                value={isChecked}
                color={isChecked ? colors.lightBlue : undefined}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                  color: colors.lightBlue,
                  fontWeight: "bold",
                }}
              >
                Remember me
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Reset")}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.lightBlue,
                fontWeight: "bold",
              }}
            >
              Forgot password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: "15%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RoundedButton text={"Login"} />
        </View>
      </View>
    </View>
  );
};
