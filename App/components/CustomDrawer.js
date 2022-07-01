import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { authentication } from "../config/firebase";
import { Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { getDrawerStatusFromState } from "@react-navigation/drawer";
import { db } from "../config/firebase";

import styles from "../constants/styles";
import colors from "../constants/colors";

import DrawerItem from "./DrawerItem";
import BottomSheet_ from "../components/BottomSheet_";

const windowWidth = Dimensions.get("window").width;

export default CustomDrawer = ({ navigation }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [removalModalMode, setRemovalModalMode] = useState(false);
  const [notesCategory, setNotesCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalSelectedCategory, setModalSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState("");
  const [categoriesId, setCategoriesId] = useState("");

  useEffect(() => {
    navigation.addListener("state", () => {
      const isDrawerOpen = getDrawerStatusFromState(navigation.getState());

      (async () => {
        await AsyncStorage.getItem("selectedCategory").then((data) =>
          setSelectedCategory(data)
        );
      })();
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const categoriesId = await AsyncStorage.getItem("categoriesId");

        setUserId(userId);
        setCategoriesId(categoriesId);
        try {
          const docRef = doc(db, "users", userId, "categories", categoriesId);
          const docSnap = await getDoc(docRef);
          var data = Object.keys(docSnap.data());
          data = data.filter(
            (item) => item != "Personal" && item != "Study" && item != "Work"
          );
          const categories = [
            "All",
            "Personal",
            "Study",
            "Work",
            ...data.sort(),
            "Add Category",
          ];
          setCategories(categories);

          try {
            await AsyncStorage.setItem(
              "categories",
              JSON.stringify(categories)
            );
            await AsyncStorage.setItem(
              "pickerCategories",
              JSON.stringify(categories.slice(1, -1))
            );
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categories]);

  const addCategory = async () => {
    try {
      const docRef = doc(db, "users", userId, "categories", categoriesId);

      if (categories.includes(notesCategory) == false) {
        if (notesCategory.length < 3) {
          Alert.alert("Something went wrong", "Note category name too short");
        } else {
          await setDoc(docRef, { [notesCategory]: [] }, { merge: true });
        }
      } else {
        Alert.alert("Something went wrong", "Note category already created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCategory = async () => {
    const docRef = doc(db, "users", userId, "categories", categoriesId);

    try {
      await updateDoc(docRef, { [modalSelectedCategory]: deleteField() });
    } catch (error) {
      console.log(error);
    }

    if (modalSelectedCategory == selectedCategory) {
      navigation.navigate("Home", { selectedCategory: "All" });
    } else {
      navigation.navigate("Home", { selectedCategory: "All" });
    }
  };

  const selectCategory = (name) => {
    navigation.navigate("Home", { selectedCategory: name });
  };

  const sheetRef = useRef(null);

  //
  StatusBar.setBackgroundColor(visibleModal ? colors.black : colors.lightBlue);
  //
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/backgroundimage.jpg")}
        style={[styles.loginBackgroundImage, { width: "100%", height: "30%" }]}
      />
      <View style={styles.drawerTitle}>
        <Text style={{ fontSize: 0.05 * windowWidth, color: colors.white }}>
          Logged in as
        </Text>
        <Text
          style={{
            fontSize: 0.08 * windowWidth,
            fontWeight: "bold",
            color: colors.white,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {authentication.currentUser.displayName}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "62%",
        }}
      >
        <ScrollView>
          {categories != undefined
            ? categories.map((item, index) => (
                <DrawerItem
                  name={item}
                  key={index}
                  addCategory={() => setVisibleModal(true)}
                  selectCategory={() => selectCategory(item)}
                  onLongPress={() =>
                    item != "All" &&
                    item != "Personal" &&
                    item != "Study" &&
                    item != "Work" &&
                    item != "Add Category"
                      ? (sheetRef.current.snapTo(0),
                        setModalSelectedCategory(item))
                      : sheetRef.current.snapTo(2)
                  }
                />
              ))
            : null}
        </ScrollView>
      </View>
      <View style={styles.drawerBottom}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
          }}
          activeOpacity={0.5}
          onPress={() => {
            (async () => {
              await AsyncStorage.setItem("userId", "");
              await AsyncStorage.setItem("categoriesId", "");
            })();
            authentication.signOut();
          }}
        >
          <Entypo
            name="log-out"
            size={0.06 * windowWidth}
            color={colors.black}
            style={{ margin: "10%", marginRight: "2%" }}
          />
          <Text
            style={{
              fontSize: 0.05 * windowWidth,
              fontWeight: "bold",
              color: colors.red,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visibleModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalPrompt}>
            {!removalModalMode ? (
              <View style={styles.modalTextInput}>
                <TextInput
                  placeholder="Note Category"
                  value={notesCategory}
                  selectionColor={colors.black}
                  textAlign={"center"}
                  style={{
                    width: "90%",
                    color: colors.black,
                    fontSize: 0.06 * windowWidth,
                  }}
                  onChangeText={(text) => setNotesCategory(text)}
                />
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80%",
                }}
              >
                <Text
                  style={{
                    fontSize: 0.05 * windowWidth,
                    color: colors.black,
                    textAlign: "center",
                  }}
                >
                  Are you sure you want to delete '{modalSelectedCategory}' note
                  category? The notes that are inside of it will be deleted too!
                </Text>
              </View>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal(false),
                    setRemovalModalMode(false),
                    setNotesCategory("");
                }}
              >
                <Text
                  style={{
                    color: !removalModalMode ? colors.red : colors.lightBlue,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  {!removalModalMode ? "Cancel" : "No"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  !removalModalMode
                    ? (addCategory(),
                      setVisibleModal(false),
                      setNotesCategory(""),
                      sheetRef.current.snapTo(2))
                    : (removeCategory(),
                      setVisibleModal(false),
                      setRemovalModalMode(false),
                      sheetRef.current.snapTo(2))
                }
              >
                <Text
                  style={{
                    color: !removalModalMode ? colors.lightBlue : colors.red,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  {!removalModalMode ? "Add" : "Yes"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={["25%", 0, 0]}
        borderRadius={20}
        renderContent={() => (
          <BottomSheet_
            option1={"Remove"}
            option2={"Cancel"}
            onPress1={() => {
              setRemovalModalMode(true), setVisibleModal(true);
            }}
            onPress2={() => sheetRef.current.snapTo(2)}
          />
        )}
      />
    </View>
  );
};
