import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";
import { authentication } from "../config/firebase";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import Card from "../components/Card";

import colors from "../constants/colors";
import styles from "../constants/styles";

const windowWidth = Dimensions.get("window").width;

export default ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  // temporary
  const [notes, setNotes] = useState([
    {
      title: "Note Title",
      content: "Note Content",
      date: moment(new Date()).format("LL"),
    },
  ]);

  useEffect(() => {
    setSelectedCategory(route.params?.selectedCategory);
  }, [route.params?.selectedCategory]);

  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <View style={styles.bottomSheetItems}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(2)}>
          <Text
            style={{
              fontSize: 25,
              color: colors.lightBlue,
              fontWeight: "bold",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <View style={styles.hairline} />
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(2)}>
          <Text style={{ fontSize: 25, color: colors.red, fontWeight: "bold" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
            onPress={() =>
              navigation.navigate("Note", {
                title: item.title,
                content: item.content,
                editMode: false,
              })
            }
            onLongPress={() => sheetRef.current.snapTo(0)}
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
            {selectedCategory ? selectedCategory : "All"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addNoteButton}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("Note", { editMode: true, addNoteMode: true })
        }
      >
        <Entypo name="plus" size={40} color={colors.white} />
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={["25%", 0, 0]}
        borderRadius={20}
        renderContent={renderContent}
      />
    </View>
  );
};
