import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import useRouting from "../useRoute";
import { AuthStateChanged } from "../redux/auth/authOperation";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthStateChanged());
  }, []);

  const route = useRouting(stateChange);

  return <NavigationContainer>{route}</NavigationContainer>;
};
