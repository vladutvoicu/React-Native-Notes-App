import React, { useState } from "react";
import { View, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "../constants/styles";
import colors from "../constants/colors";

const windowWidth = Dimensions.get("window").width;

export default AuthInput = ({
  icon,
  placeholder,
  password,
  value,
  onChangeText,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.authInput}>
      <View
        style={{
          height: "100%",
          width: "13%",
          alignItems: "center",
          justifyContent: "center",
          borderRightWidth: 2,
          borderColor: colors.lightBlue,
        }}
      >
        <Entypo name={icon} size={30} />
      </View>
      <TextInput
        style={{
          marginLeft: "5%",
          width: "70%",
          fontSize: 0.055 * windowWidth,
          color: colors.black,
        }}
        value={value}
        selectionColor={colors.black}
        autoCapitalize={"none"}
        secureTextEntry={password ? secureTextEntry : undefined}
        keyboardType={password ? "default" : "email-address"}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {password ? (
        <TouchableOpacity
          onPress={() =>
            secureTextEntry
              ? setSecureTextEntry(false)
              : setSecureTextEntry(true)
          }
        >
          <Entypo name="eye" size={30} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
