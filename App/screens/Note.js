import React, { useState, useRef, useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import colors from "../constants/colors";
import styles from "../constants/styles";

import RoundedButton from "../components/RoundedButton";

const windowWidth = Dimensions.get("window").width;

export default Note = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params?.title);
  const [content, setContent] = useState(route.params?.content);
  const [noteKey, setNoteKey] = useState(route.params?.key);
  const [editable, setEditable] = useState(route.params?.editMode);
  const [addNoteMode] = useState(route.params?.addNoteMode);
  const [deleteNoteMode, setDeleteNoteMode] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.selectedCategory
  );
  const [pickerCategory, setPickerCategory] = useState(
    route.params?.noteCategory
  );
  const [noteCategory, setNoteCategory] = useState(route.params?.noteCategory);
  const [userId, setUserId] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [disabledChevron, setDisabledChevron] = useState(false);

  useEffect(() => {
    (async () => {
      const categories = await AsyncStorage.getItem("pickerCategories");
      setCategories(JSON.parse(categories));

      const userId = await AsyncStorage.getItem("userId");
      const categoriesId = await AsyncStorage.getItem("categoriesId");

      setUserId(userId);
      setCategoriesId(categoriesId);
    })();
  }, []);

  const generateKey = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789!@#$%^&*!@#$%^*";

    let key = "";
    const charactersLength = characters.length;
    for (let i = 0; i < Math.floor(Math.random() * 26) + 10; i++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return key;
  };

  const addNote = async () => {
    setDisabledChevron(true);

    const docRef = doc(db, "users", userId, "categories", categoriesId);

    try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()[pickerCategory];

      await updateDoc(docRef, {
        [pickerCategory]: [
          ...data,
          {
            title: title == undefined ? "Note Title" : title,
            content: content == undefined ? "Note Content" : content,
            date: moment(new Date()).format("LL"),
            key: generateKey(),
            category: pickerCategory,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  const updateNote = async () => {
    setDisabledChevron(true);

    const docRef = doc(db, "users", userId, "categories", categoriesId);

    try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()[noteCategory];

      var notes = [];
      Object.keys(data).map((key) => {
        if (data[key].key != noteKey) {
          notes.push(data[key]);
        } else {
          var note = data[key];
          note["title"] = title;
          note["content"] = content;

          notes.push(note);

          if (pickerCategory == noteCategory) {
            (async () => {
              try {
                await updateDoc(docRef, {
                  [noteCategory]: notes,
                });
              } catch (error) {
                console.log(error);
              }
            })();
          } else {
            deleteNote();

            note["category"] = pickerCategory;

            (async () => {
              try {
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()[pickerCategory];

                await updateDoc(docRef, {
                  [pickerCategory]: [...data, note],
                });
              } catch (error) {
                console.log(error);
              }
            })();
          }
        }
      });
    } catch (error) {}
    await new Promise((resolve) => setTimeout(resolve, 100));

    setDisabledChevron(false);
  };

  const deleteNote = async () => {
    setDisabledChevron(true);

    const docRef = doc(db, "users", userId, "categories", categoriesId);

    try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()[noteCategory];

      var notes = [];
      Object.keys(data).map((key) => {
        if (data[key].key != noteKey) {
          notes.push(data[key]);
        } else {
        }
      });

      await updateDoc(docRef, { [noteCategory]: notes });
    } catch (error) {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  const pickerRef = useRef();

  const renderButtons = () => {
    if (addNoteMode != true) {
      if (editable == true) {
        return (
          <View style={styles.noteBottomContainer}>
            <Picker
              style={{
                width: "50%",
                color: colors.black,
              }}
              ref={pickerRef}
              selectedValue={pickerCategory}
              onValueChange={(item) => setPickerCategory(item)}
              mode={"dropdown"}
            >
              {categories.map((category) => (
                <Picker.Item label={category} value={category} key={category} />
              ))}
            </Picker>
            <View style={styles.noteButtonContainer}>
              <RoundedButton
                text={"Cancel"}
                color={colors.red}
                onPress={() => setVisibleModal(true)}
              />
              <RoundedButton
                text={"Save"}
                onPress={() => updateNote().then(() => setEditable(false))}
              />
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.noteBottomContainer}>
            <View
              style={[
                styles.noteButtonContainer,
                { position: "absolute", top: "50%" },
              ]}
            >
              <RoundedButton text={"Edit"} onPress={() => setEditable(true)} />
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.noteBottomContainer}>
          <Picker
            style={{
              width: "50%",
              color: colors.black,
            }}
            ref={pickerRef}
            selectedValue={pickerCategory}
            onValueChange={(item) => setPickerCategory(item)}
            mode={"dropdown"}
          >
            {categories.map((category) => (
              <Picker.Item label={category} value={category} key={category} />
            ))}
          </Picker>
          <View style={styles.noteButtonContainer}>
            <RoundedButton
              text={"Cancel"}
              color={colors.red}
              onPress={() => setVisibleModal(true)}
            />
            <RoundedButton
              text={"Add"}
              onPress={() => {
                addNote().then(() =>
                  navigation.navigate("Home", {
                    selectedCategory: pickerCategory,
                  })
                );
              }}
            />
          </View>
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
          disabled={disabledChevron ? true : false}
          style={{ marginLeft: "5%" }}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("Home", {
              selectedCategory: selectedCategory,
            });
          }}
        >
          <Entypo name="chevron-down" size={50} color={colors.white} />
        </TouchableOpacity>
        {!addNoteMode ? (
          <TouchableOpacity
            style={{ marginRight: "5%" }}
            activeOpacity={0.5}
            onPress={() => {
              {
                setDeleteNoteMode(true);
                setVisibleModal(true);
              }
            }}
          >
            <Entypo name="trash" size={40} color={colors.white} />
          </TouchableOpacity>
        ) : null}
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
                  : deleteNoteMode
                  ? "Are you sure you want to delete this note?"
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
                    deleteNoteMode
                      ? deleteNote().then(() =>
                          navigation.navigate("Home", {
                            selectedCategory: selectedCategory,
                          })
                        )
                      : !addNoteMode
                      ? setEditable(false)
                      : navigation.navigate("Home", {
                          selectedCategory: selectedCategory,
                        });
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
