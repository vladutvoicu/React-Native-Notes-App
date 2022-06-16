import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

import styles from "../constants/styles";
import colors from "../constants/colors";

export default DrawerItem = ({ name }) => {
  const getIcon = () => {
    let icon;
    if (name == "All") {
      icon = "archive";
    } else if (name == "Personal") {
      icon = "home";
    } else if (name == "Study") {
      icon = "open-book";
    } else if (name == "Work") {
      icon = "briefcase";
    } else {
      icon = null;
    }
    return icon;
  };

  return (
    <View
      style={{
        margin: "5%",
        marginLeft: "20%",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        activeOpacity={0.5}
      >
        {getIcon() != null ? (
          <Entypo
            name={getIcon()}
            size={0.06 * windowWidth}
            style={{ position: "absolute", left: "-15%" }}
          />
        ) : null}
        <Text style={{ fontSize: 0.06 * windowWidth }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};
