import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { authentication } from "../config/firebase";
import { Entypo } from "@expo/vector-icons";

import styles from "../constants/styles";
import colors from "../constants/colors";

import DrawerItem from "./DrawerItem";

const windowWidth = Dimensions.get("window").width;

export default CustomDrawer = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/backgroundimage.jpg")}
        style={[styles.loginBackgroundImage, { width: "100%", height: "30%" }]}
      />
      <View style={styles.drawerTitle}>
        <Text style={{ fontSize: 0.05 * windowWidth, color: colors.white }}>
          Logged in as
        </Text>
        <Text
          style={{
            fontSize: 0.08 * windowWidth,
            fontWeight: "bold",
            color: colors.white,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {authentication.currentUser.displayName}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "62%",
        }}
      >
        <ScrollView>
          {data.map((item) => (
            <DrawerItem name={item.name} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.drawerBottom}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
          }}
          activeOpacity={0.5}
          onPress={() => authentication.signOut()}
        >
          <Entypo
            name="log-out"
            size={0.06 * windowWidth}
            color={colors.black}
            style={{ margin: "10%", marginRight: "2%" }}
          />
          <Text
            style={{
              fontSize: 0.05 * windowWidth,
              fontWeight: "bold",
              color: colors.black,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
