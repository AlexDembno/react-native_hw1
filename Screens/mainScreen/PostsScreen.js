import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from "../nestedScreens/DefaultScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";


const NestedScreen = createStackNavigator();

function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="DefaultScreen" component={DefaultScreen}/>
      <NestedScreen.Screen name="MapScreen" component={MapScreen}/>
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen}/>
    </NestedScreen.Navigator>
  );
}

export default PostsScreen;


