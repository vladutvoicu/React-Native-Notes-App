import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

import styles from "../constants/styles";
import colors from "../constants/colors";

export default Card = ({ title, content, date, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
    >
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
            color: colors.black,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightBlue,
          }}
        >
          {date}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: colors.lightBlue,
        }}
      >
        <Text
          style={{
            fontSize: 0.06 * windowWidth,
            fontWeight: "bold",
            color: colors.black,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ width: "100%", height: "70%" }}>
        <Text
          style={{
            fontSize: 0.04 * windowWidth,
            color: colors.black,
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
