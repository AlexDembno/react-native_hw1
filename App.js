import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import useRouting from "./useRoute";

export default function App() {
  const route = useRouting({});

  return (
    <NavigationContainer>{route}</NavigationContainer>
  );
}
