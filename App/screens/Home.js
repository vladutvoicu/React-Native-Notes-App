import React, { useState } from "react";
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

import Card from "../components/Card";

import colors from "../constants/colors";
import styles from "../constants/styles";

const windowWidth = Dimensions.get("window").width;

export default ({ navigation }) => {
  // temporary
  const [notes, setNotes] = useState([
    {
      title: "Note Title",
      content: "Note Content",
      date: moment(new Date()).format("LL"),
    },
  ]);

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
          onPress={() => navigation.openDrawer()}
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
          <Card title={item.title} content={item.content} date={item.date} />
        )}
      />
      <TouchableOpacity style={styles.addNoteButton} activeOpacity={0.5}>
        <Entypo name="plus" size={40} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};
