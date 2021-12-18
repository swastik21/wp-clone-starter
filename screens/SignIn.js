import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress () {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  };

  /* handlePress().catch(e=>alert(e)) */
  
  return (
    <View style={{ ...styles.container, backgroundColor: colors.white }}>
      <Text style={{ ...styles.text, color: colors.foreground }}>
        Welcome to ☠Whatsapp 2.0☠
      </Text>
      <Image
        source={require("../assets/welcome-img.png")}
        style={styles.image}
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ ...styles.input, borderBottomColor: colors.primary }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{
            ...styles.input,
            borderBottomColor: colors.primary,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign Up" : "Sign In"}
            disabled={!email || !password}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text style={{ color: colors.secondaryText,textAlign:'center' }}>
            {mode === "signUp"
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    height: 180,
    width: 180,
    resizeMode: "cover",
  },
  input: {
    borderBottomWidth: 2,
    width: 200,
  },
});
