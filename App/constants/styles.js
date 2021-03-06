import React from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";

import colors from "./colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  loginHeader: {
    top: StatusBar.currentHeight,
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loginBackgroundImage: {
    position: "absolute",
    top: 0,
    height: Dimensions.get("window").height / 2.5,
    width: Dimensions.get("window").width,
    zIndex: -1,
  },
  authContainer: {
    height: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    zIndex: 2,
  },
  authInputContainer: {
    top: "5%",
    width: "100%",
    alignItems: "center",
  },
  authInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: (6 / 100) * windowHeight,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.lightBlue,
    backgroundColor: colors.white,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  roundedButton: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backChevron: {
    position: "absolute",
    left: 20,
    top: StatusBar.currentHeight + 10,
    zIndex: 3,
  },
  homeHeader: {
    top: StatusBar.currentHeight,
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.lightBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  homeHeaderTitle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addNoteButton: {
    position: "absolute",
    bottom: "3%",
    right: "10%",
    padding: 10,
    backgroundColor: colors.lightBlue,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 100,
  },
  card: {
    width: (45 / 100) * windowWidth,
    height: (30 / 100) * windowHeight,
    flexDirection: "column",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    backgroundColor: colors.white,
    marginVertical: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  drawerTitle: {
    top: StatusBar.currentHeight,
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  drawerBottom: {
    position: "absolute",
    bottom: 0,
    height: "8%",
    width: "100%",
    borderTopWidth: 2,
    borderTopColor: colors.lightBlue,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: `${colors.black}50`,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrompt: {
    height: "30%",
    width: "80%",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.lightBlue,
    alignItems: "center",
  },
  modalTextInput: {
    top: "20%",
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtons: {
    position: "absolute",
    bottom: 0,
    height: "40%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomSheet: {
    alignItems: "center",
    backgroundColor: colors.white,
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.lightBlue,
  },
  bottomSheetItems: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  header: {
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: `${colors.lightBlue}`,
    marginBottom: 10,
  },
  hairline: {
    height: 2,
    backgroundColor: `${colors.lightBlue}80`,
    width: "90%",
    borderRadius: 20,
    marginVertical: 20,
  },
  selectedCategory: {
    width: "45%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    zIndex: -1,
  },
  noteHeader: {
    top: StatusBar.currentHeight,
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.lightBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  noteHeaderTitle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  noteTextInputContainer: {
    height: "85%",
    width: "100%",
    padding: "5%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.lightBlue,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  noteBottomContainer: {
    position: "absolute",
    bottom: "4%",
    height: "10%",
    width: "100%",
    alignItems: "center",
  },
  noteButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: `${colors.black}80`,
  },
  loadingContainerHome: {
    position: "absolute",
    top: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
});

export default styles;
