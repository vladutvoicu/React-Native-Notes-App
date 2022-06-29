import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../constants/styles";
import colors from "../constants/colors";

export default BottomSheet_ = ({ option1, option2, onPress1, onPress2 }) => (
  <View style={styles.bottomSheet}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    <View style={styles.bottomSheetItems}>
      <TouchableOpacity onPress={onPress1}>
        <Text
          style={{
            fontSize: 25,
            color: colors.lightBlue,
            fontWeight: "bold",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <View style={styles.hairline} />
      <TouchableOpacity onPress={onPress2}>
        <Text style={{ fontSize: 25, color: colors.red, fontWeight: "bold" }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
