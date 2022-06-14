import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

import styles from "../constants/styles";
import colors from "../constants/colors";

export default AuthInput = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.roundedButton}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 0.055 * windowWidth,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
