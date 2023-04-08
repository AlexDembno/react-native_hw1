import React from "react";
import { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRouting from "./useRoute";

export default function App() {
  const route = useRouting({});

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

  return <NavigationContainer>{route}</NavigationContainer>;
}
