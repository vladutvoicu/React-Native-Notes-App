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
    backgroundColor: colors.lightBlue,
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
});

export default styles;
