import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image, TextInput, Button } from "react-native";
import Constants from "expo-constants";
import Context from "../context/Context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { pickImage, askForPermission, uploadImage} from '../utils'
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [displayName,setDisplayName] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [permissionStatus, setPermissionStatus] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const status = await askForPermission()
      setPermissionStatus(status)
    })()
  },[])
  
  const {
    theme: { colors },
  } = useContext(Context);

  async function handleProfilePicture() {
    const result = await pickImage()
    if (!result.cancelled) {
      setSelectedImage(result.uri)
    }
  }


  async function handlePress() {
    const user = auth.currentUser;
    let photoUrl;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoUrl = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoUrl) {
      userData.photoUrl = photoUrl;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("home");
  }

  if (!permissionStatus) {
    return <Text>Loading...</Text>
  }

  if (permissionStatus !== "granted") {
    return <Text>You need to give permission</Text>
  }
  
  return (
    <>
      {/* <StatusBar style='auto'/> */}
      <View
        style={{ ...styles.container, paddingTop: Constants.statusBarHeight }}
      >
        <Text style={{ ...styles.profile_info, color: colors.foreground }}>
          Profile Info
        </Text>
        <Text style={{ ...styles.text, color: colors.text }}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            ...styles.imageContainer,
            backgroundColor: colors.background,
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              size={45}
              color={colors.iconGray}
            />
          ) : (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{ ...styles.displayName, borderBottomColor: colors.primary }}
        />
        <View style={styles.button}>
          <Button title='Next' color={colors.secondary} onPress={handlePress} disabled={!displayName}/>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  profile_info: {
    fontSize: 22,
  },
  text: {
    fontSize: 14,
    marginTop: 20,
  },
  imageContainer: {
    marginTop: 30,
    borderRadius: 120,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:120
  },
  displayName: {
    marginTop: 40,
    width: '100%',
    borderBottomWidth:2
  },
  button: {
    width: 80,
    marginTop:'auto'
  }
});
