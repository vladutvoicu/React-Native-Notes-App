import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { authentication } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthInput from "../components/AuthInput";
import RoundedButton from "../components/RoundedButton";

import colors from "../constants/colors";
import styles from "../constants/styles";

const windowWidth = Dimensions.get("window").width;

export default ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setIds = async () => {
    setLoading(true);
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      (async () => {
        var userId;
        var categoriesId;

        if (doc.data()["user"] == email) {
          userId = doc.id;
          const q = query(collection(db, "users", userId, "categories"));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            categoriesId = doc.id;
          });
          await AsyncStorage.setItem("userId", userId);
          await AsyncStorage.setItem("categoriesId", categoriesId);

          do {
            await new Promise((resolve) => setTimeout(resolve, 100));
            var userId;
            var categoriesId;

            userId = await AsyncStorage.getItem("userId");
            categoriesId = await AsyncStorage.getItem("categoriesId");
          } while (userId == null && categoriesId == null);
        } else {
        }
      })();
    });
  };

  const signIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(
        async () => await AsyncStorage.setItem("keepLoggedIn", `${isChecked}`)
      )
      .catch((error) => {
        Alert.alert("Something went wrong", `Email or password are invalid`);
        setLoading(false);
      });
  };

  const setChecked = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };
  //
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  {
    !loading
      ? (setBackgroundColorAsync(`${colors.white}`),
        setButtonStyleAsync("dark"))
      : (setBackgroundColorAsync(`${colors.black}80`),
        setButtonStyleAsync("light"));
  }
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
            activeOpacity={0.5}
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
              activeOpacity={0.5}
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
            activeOpacity={0.5}
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
          <RoundedButton
            text={"Login"}
            onPress={() => setIds().then(() => signIn())}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={0.2 * windowWidth} color={colors.white} />
        </View>
      ) : null}
    </View>
  );
};
