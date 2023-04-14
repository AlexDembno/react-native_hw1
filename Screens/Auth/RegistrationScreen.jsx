import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { authSingUp } from "../../redux/auth/authOperation";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

function RegistrationScreen({ navigation }) {
  const [showKeybord, setShowKeybord] = useState(false);
  const [state, setState] = useState(initialValue);
  const [focuses, setFocus] = useState("");

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const hideKeybord = () => {
    Keyboard.dismiss();
    setShowKeybord(false);
    setState(initialValue);
    setFocus("");
  };

  const handlSubmit = () => {
    Keyboard.dismiss();
    setShowKeybord(false);
    dispatch(authSingUp(state));
    setState(initialValue);
    setFocus("");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeybord}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photoBackground.jpg")}
        >
          <View style={styles.formContainer}>
            <View>
              <Text
                style={{
                  ...styles.title,
                  fontFamily: "RobotoMedium",
                  fontSize: 30,
                }}
              >
                Регистрация
              </Text>
              <View style={styles.form}>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    onFocus={() => {
                      setShowKeybord(true);
                      setFocus("login");
                    }}
                    style={{
                      ...styles.input,
                      fontFamily: "RobotoMedium",
                      fontSize: 16,
                      borderColor: focuses === "login" ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: "#F6F6F6",
                    }}
                    placeholder="Логин"
                    value={state.name}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, name: value }))
                    }
                  />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    onFocus={() => {
                      setShowKeybord(true);
                      setFocus("email");
                    }}
                    style={{
                      ...styles.input,
                      fontFamily: "RobotoMedium",
                      fontSize: 16,
                      borderColor: focuses === "email" ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: "#F6F6F6",
                    }}
                    placeholder="Адрес электронной почты"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  />
                </View>
                <View style={{ marginBottom: 43 }}>
                  <TextInput
                    onFocus={() => {
                      setShowKeybord(true);
                      setFocus("password");
                    }}
                    style={{
                      ...styles.input,
                      fontFamily: "RobotoMedium",
                      fontSize: 16,
                      borderColor:
                        focuses === "password" ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: "#F6F6F6",
                    }}
                    placeholder="Пароль"
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btn}
                  onPress={handlSubmit}
                >
                  <Text
                    style={{
                      ...styles.btnText,
                      fontFamily: "RobotoRegular",
                      fontSize: 16,
                    }}
                  >
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      ...styles.text,
                      fontFamily: "RobotoRegular",
                      fontSize: 16,
                      marginBottom: 32,
                      color: "#1B4371",
                    }}
                  >
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 6,
    padding: 16,
  },
  text: {
    marginTop: 16,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#FF6C00",
    padding: 10,
    borderRadius: 20,
  },
  btnText: {
    textAlign: "center",
  },
});

export default RegistrationScreen;
