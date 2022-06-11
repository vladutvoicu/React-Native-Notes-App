import React from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";

import colors from "./colors";

const windowHeight = Dimensions.get("window").height;

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
});

export default styles;
