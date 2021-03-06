import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { useAssets } from 'expo-asset';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SignIn from './screens/SignIn';
import ContextWrapper from './context/ContextWrapper';
import Context from './context/Context';
import Profile from './screens/Profile';
import Photo from './screens/Photo';
import Chats from './screens/Chats'
import {Ionicons} from '@expo/vector-icons'

LogBox.ignoreLogs([
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground.",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release."
])

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()
const App = () => {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {theme: {colors}} = useContext(Context)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setCurrUser(user)
      }
    })
    return ()=> unsubscribe()
  })

  if (loading) {
    return<Text>Loading...</Text>
  }
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ title: "???Whatsapp 2.0???" }}
            component={Home}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const Home = () => {
  const {theme:{colors}} = useContext(Context)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" color={colors.white} size={20} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

export default function main() {
  const [assets] = useAssets(
    require("./assets/chatbg.png"),
    require("./assets/icon-square.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  )
  if (!assets) {
    return <Text>Loading</Text>
  }
  return (
    <ContextWrapper>
      <App/>
    </ContextWrapper>
  );
}