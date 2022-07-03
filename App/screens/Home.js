import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import {
  getDrawerStatusFromState,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import Card from "../components/Card";
import BottomSheet_ from "../components/BottomSheet_";

import colors from "../constants/colors";
import styles from "../constants/styles";

const windowWidth = Dimensions.get("window").width;

export default ({ navigation, route }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const drawerState = useDrawerStatus();

  useEffect(() => {
    navigation.addListener("state", () => {
      const isDrawerOpen = getDrawerStatusFromState(navigation.getState());

      (async () => {
        await AsyncStorage.setItem(
          "selectedCategory",
          route.params?.selectedCategory
            ? route.params?.selectedCategory
            : "All"
        );
      })();
    });
  }, [route.params?.selectedCategory]);

  useEffect(() => {
    if (drawerState == "closed") {
      setNotes([]);
      setLoading(true);
      (async () => {
        const userId = await AsyncStorage.getItem("userId");
        const categoriesId = await AsyncStorage.getItem("categoriesId");
        return [userId, categoriesId];
      })()
        .then((ids) => {
          if (
            route.params?.selectedCategory != undefined &&
            route.params?.selectedCategory != "All"
          ) {
            (async () => {
              const docRef = doc(db, "users", ids[0], "categories", ids[1]);
              try {
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()[route.params?.selectedCategory];

                setNotes(data);
              } catch (error) {
                console.log(error);
              }
            })();
          } else {
            (async () => {
              const docRef = doc(db, "users", ids[0], "categories", ids[1]);
              try {
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                var notes = [];
                Object.keys(data).map((key) => {
                  var category = data[key];
                  for (const i in category) {
                    notes.push(category[i]);
                  }
                });
                setNotes(notes);
              } catch (error) {
                console.log(error);
              }
            })();
          }
        })
        .then(() => setLoading(false));
    }
  }, [route.params?.selectedCategory, isFocused, drawerState]);

  const sheetRef = useRef(null);

  //
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor(colors.lightBlue);
  setBackgroundColorAsync(`${colors.white}`);
  setButtonStyleAsync("dark");
  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.homeHeader}>
        <TouchableOpacity
          style={{ marginLeft: "5%" }}
          activeOpacity={0.5}
          onPress={() => {
            sheetRef.current.snapTo(2), navigation.openDrawer();
          }}
        >
          <Entypo name="menu" size={50} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.homeHeaderTitle}>
          <Text
            style={{
              fontSize: 0.09 * windowWidth,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            Notes App
          </Text>
        </View>
      </View>
      <FlatList
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: "35%",
          paddingBottom: "10%",
        }}
        numColumns={2}
        data={notes}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            content={item.content}
            date={item.date}
            category={
              route.params?.selectedCategory == "All" ||
              route.params?.selectedCategory == undefined
                ? item.category
                : null
            }
            key={item.key}
            onPress={() =>
              navigation.navigate("Note", {
                title: item.title,
                content: item.content,
                noteCategory: item.category,
                selectedCategory:
                  route.params?.selectedCategory == "All" ||
                  route.params?.selectedCategory == undefined
                    ? "All"
                    : item.category,
                key: item.key,
                editMode: false,
              })
            }
            onLongPress={() => {
              sheetRef.current.snapTo(0),
                setSelectedNote({
                  title: item.title,
                  content: item.content,
                  noteCategory: item.category,
                  selectedCategory:
                    route.params?.selectedCategory == "All" ||
                    route.params?.selectedCategory == undefined
                      ? "All"
                      : item.category,
                  key: item.key,
                  editMode: true,
                });
            }}
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          top: "13%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={styles.selectedCategory}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{
              width: "90%",
              textAlign: "center",
              fontSize: 0.06 * windowWidth,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            {route.params?.selectedCategory != undefined
              ? route.params?.selectedCategory
              : "All"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addNoteButton}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("Note", {
            editMode: true,
            addNoteMode: true,
            selectedCategory: route.params?.selectedCategory,
            noteCategory: route.params?.selectedCategory,
          })
        }
      >
        <Entypo name="plus" size={40} color={colors.white} />
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={["25%", 0, 0]}
        borderRadius={20}
        renderContent={() => (
          <BottomSheet_
            option1={"Edit"}
            option2={"Cancel"}
            onPress1={() => {
              navigation.navigate("Note", selectedNote),
                sheetRef.current.snapTo(2);
            }}
            onPress2={() => sheetRef.current.snapTo(2)}
          />
        )}
      />
      {loading ? (
        <View style={styles.loadingContainerHome}>
          <ActivityIndicator size={0.15 * windowWidth} color={colors.black} />
        </View>
      ) : null}
    </View>
  );
};
