import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
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
    // <View>
    //   <LoginScreen onLayoutRootView={onLayoutRootView} />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>

      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     justifyContent: "center",
//   },
// });
