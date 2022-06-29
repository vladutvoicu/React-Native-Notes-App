import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

import styles from "../constants/styles";
import colors from "../constants/colors";

export default Card = ({
  title,
  content,
  date,
  category,
  onPress,
  onLongPress,
}) => {
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            fontSize: 0.06 * windowWidth,
            fontWeight: "bold",
            color: colors.black,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: category ? "65%" : "75%",
          borderBottomWidth: category ? 2 : null,
          borderBottomColor: colors.lightBlue,
        }}
      >
        <Text
          style={{
            fontSize: 0.04 * windowWidth,
            color: colors.black,
            paddingTop: "4%",
            paddingHorizontal: "4%",
          }}
        >
          {content}
        </Text>
      </View>
      {category ? (
        <View
          style={{
            position: "absolute",
            bottom: "-1%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 0.05 * windowWidth,
                color: colors.black,
                marginTop: "5%",
                marginLeft: "5%",
              }}
            >
              {category}
            </Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
