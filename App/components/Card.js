import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

import styles from "../constants/styles";
import colors from "../constants/colors";

export default Card = ({ title, content, date }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.5}>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 0.035 * windowWidth,
            marginRight: "5%",
            color: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: colors.white,
          }}
        >
          {date}
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: 0.06 * windowWidth,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ width: "100%", height: "70%" }}>
        <Text
          style={{
            fontSize: 0.04 * windowWidth,
            color: colors.white,
            marginTop: "5%",
            marginLeft: "5%",
          }}
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
