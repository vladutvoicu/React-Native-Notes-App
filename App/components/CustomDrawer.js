import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  StatusBar,
  TextInput,
} from "react-native";
import { authentication } from "../config/firebase";
import { Entypo } from "@expo/vector-icons";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";

import styles from "../constants/styles";
import colors from "../constants/colors";

import DrawerItem from "./DrawerItem";

const windowWidth = Dimensions.get("window").width;

export default CustomDrawer = ({ navigation }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [notesCategory, setNotesCategory] = useState("");
  const [categories, setCategories] = useState([
    { name: "All", key: "all" },
    { name: "Personal", key: "personal" },
    { name: "Study", key: "study" },
    { name: "Work", key: "work" },
    { name: "Add Category", key: "addCategory" },
  ]);

  const addCategory = () => {
    setVisibleModal(true);
  };

  const selectCategory = (name) => {
    navigation.navigate("Home", { selectedCategory: name });
  };

  //
  StatusBar.setBackgroundColor(visibleModal ? colors.black : colors.lightBlue);
  //
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
          {categories.map((item) => (
            <DrawerItem
              name={item.name}
              key={item.key}
              addCategory={addCategory}
              selectCategory={() => selectCategory(item.name)}
            />
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
              color: colors.red,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visibleModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalPrompt}>
            <View style={styles.modalTextInput}>
              <TextInput
                placeholder="Note Category"
                value={notesCategory}
                selectionColor={colors.black}
                textAlign={"center"}
                style={{
                  width: "90%",
                  color: colors.black,
                  fontSize: 0.06 * windowWidth,
                }}
                onChangeText={(text) => setNotesCategory(text)}
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <Text
                  style={{
                    color: colors.red,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.lightBlue,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
