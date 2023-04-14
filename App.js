import React from "react";
// import { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
// import { View } from "react-native";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./Screens/Auth/LoginScreen";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// import useRouting from "./useRoute";

import { Main } from "./components/Main";

export default function App() {
  // const [user, setUser] = useState(null);
  // const route = useRouting(user);

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => setUser(user));

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
      {/* <LoginScreen onLayoutRootView={onLayoutRootView} /> */}
      {/* <NavigationContainer>{route}</NavigationContainer> */}
    </Provider>
  );
}
