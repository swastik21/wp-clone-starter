//CREATED BY SWASTIK POOJARI

import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalContext from "../context/Context";

export default function ContactsFloatingIcon(props) {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <TouchableOpacity
      style={{ ...styles.iconContainer, backgroundColor: colors.secondary }}
    >
      <MaterialCommunityIcons
        name="android-messages"
        size={30}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    transform: [{ scaleX: -1 }],
  },
});
