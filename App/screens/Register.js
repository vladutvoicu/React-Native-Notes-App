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
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
} from "firebase/firestore";
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

  const signUp = async () => {
    try {
      const q = query(collection(db, "users"));
      var users = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data()["user"]);
      });
    } catch (error) {
      console.log(error);
    }

    if (users.includes(email) == false) {
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
        await AsyncStorage.setItem("userId", docUserRef.id);
        await AsyncStorage.setItem("categoriesId", docCategoriesRef.id);

        var userRefId = docUserRef.id;
        var categoriesRefId = docCategoriesRef.id;

        do {
          await new Promise((resolve) => setTimeout(resolve, 100));
          var userId;
          var categoriesId;

          userId = await AsyncStorage.getItem("userId");
          categoriesId = await AsyncStorage.getItem("categoriesId");
        } while (userId == null && categoriesId == null);
        (() => {
          if (password == reEnteredPassword && username != "") {
            createUserWithEmailAndPassword(authentication, email, password)
              .then(async () => {
                updateProfile(authentication.currentUser, {
                  displayName: username,
                }).catch((error) => console.log(error));
                await AsyncStorage.setItem("keepLoggedIn", "true");
              })
              .catch(async (error) => {
                Alert.alert("Something went wrong", "Invalid email");
                var docRef = doc(
                  db,
                  "users",
                  userRefId,
                  "categories",
                  categoriesRefId
                );
                await deleteDoc(docRef);
                var docRef = doc(db, "users", userRefId);
                await deleteDoc(docRef);
              });
          } else if (username == "") {
            Alert.alert("Something went wrong", "You must enter an username!");
          } else {
            Alert.alert("Something went wrong", "Passwords must be the same!");
          }
        })();
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Something went wrong", "Invalid email");
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
          <RoundedButton text={"Register"} onPress={() => signUp()} />
        </View>
      </View>
    </View>
  );
};
