import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";
import styles from "../constants/styles";

import RoundedButton from "../components/RoundedButton";

const windowWidth = Dimensions.get("window").width;

export default Note = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params?.title);
  const [content, setContent] = useState(route.params?.content);
  const [editable, setEditable] = useState(route.params?.editMode);
  const [addNoteMode] = useState(route.params?.addNoteMode);
  const [visibleModal, setVisibleModal] = useState(false);

  const renderButtons = () => {
    if (addNoteMode != true) {
      if (editable == true) {
        return (
          <View style={styles.noteButtonContainer}>
            <RoundedButton
              text={"Cancel"}
              color={colors.red}
              onPress={() => setVisibleModal(true)}
            />
            <RoundedButton text={"Save"} />
          </View>
        );
      } else {
        return (
          <View style={styles.noteButtonContainer}>
            <RoundedButton text={"Edit"} onPress={() => setEditable(true)} />
          </View>
        );
      }
    } else {
      return (
        <View style={styles.noteButtonContainer}>
          <RoundedButton
            text={"Cancel"}
            color={colors.red}
            onPress={() => setVisibleModal(true)}
          />
          <RoundedButton text={"Add"} />
        </View>
      );
    }
  };

  //
  StatusBar.setBackgroundColor(visibleModal ? colors.black : colors.lightBlue);
  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.noteHeader}>
        <TouchableOpacity
          style={{ marginLeft: "5%" }}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Entypo name="chevron-down" size={50} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.noteHeaderTitle}>
          <TextInput
            style={{
              width: "60%",
              fontSize: 0.07 * windowWidth,
              color: colors.white,
              fontWeight: "bold",
            }}
            textAlign={"center"}
            numberOfLines={1}
            selectionColor={`${colors.white}50`}
            placeholder="Note Title"
            placeholderTextColor={colors.white}
            value={title}
            onChangeText={(text) => setTitle(text)}
            editable={editable}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "10%",
          padding: "5%",
          paddingHorizontal: "5%",
        }}
      >
        <View style={styles.noteTextInputContainer}>
          {editable ? (
            <TextInput
              style={{
                flex: 1,
                fontSize: 0.05 * windowWidth,
                color: colors.black,
              }}
              multiline={true}
              textAlignVertical={"top"}
              selectionColor={`${colors.black}50`}
              placeholder="Note Content"
              value={content}
              onChangeText={(text) => setContent(text)}
              editable={editable}
            />
          ) : (
            <ScrollView style={{ flex: 1 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 0.05 * windowWidth,
                  color: colors.black,
                }}
              >
                {content}
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
      {renderButtons()}
      <Modal visible={visibleModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalPrompt}>
            <View
              style={{
                top: "20%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 0.05 * windowWidth,
                  color: colors.black,
                  textAlign: "center",
                }}
              >
                {addNoteMode
                  ? "Are you sure you want to scrap this note and cancel the creation of it?"
                  : "Are you sure you want to undo the changes done?"}
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <Text
                  style={{
                    color: colors.lightBlue,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal(false),
                    !addNoteMode
                      ? setEditable(false)
                      : navigation.navigate("Home");
                }}
              >
                <Text
                  style={{
                    color: colors.red,
                    fontSize: 0.06 * windowWidth,
                    fontWeight: "bold",
                  }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
