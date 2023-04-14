import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreens/DefaultScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Публикации"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Геолокация"
        component={MapScreen}
        // options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Комментарии"
        component={CommentsScreen}
        // options={{ headerShown: false }}
      />
    </NestedScreen.Navigator>
  );
}

export default PostsScreen;
