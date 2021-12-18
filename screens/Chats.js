//CREATED BY SWASTIK POOJARI

import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useContext,useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";

export default function Chats() {
  const { rooms, setRooms } = useContext(GlobalContext);
  const { currentUser } = auth;
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        .filter((doc) => doc.data().lastMessage)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
      setRooms(parsedChats);
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Chats</Text>
      <ContactsFloatingIcon/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
  },
});
