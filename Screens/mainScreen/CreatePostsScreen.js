import { useState, useCallback, useEffect } from "react";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialValue = {
  name: "",
  map: "",
};

SplashScreen.preventAutoHideAsync();

function CreatePostsScreen({ navigation }) {
  const [showKeybord, setShowKeybord] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [state, setState] = useState(initialValue);
  const [focuses, setFocus] = useState("");

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status camera Permissions ---> ", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
    console.log("location --->", location);
  };

  const sendPhoto = async () => {
    console.log("photo", photo);
    navigation.navigate("DefaultScreen", { photo });
  };

  const hideKeybord = () => {
    Keyboard.dismiss();
    setShowKeybord(false);
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
        <View>
          <View
            style={{
              ...styles.form,
              paddingBottom: showKeybord ? 400 : 50,
            }}
          >
            <Camera style={styles.cemera} ref={setCamera}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 70, height: 70, borderRadius: 8 }}
                  />
                </View>
              )}
              <TouchableOpacity
                onPress={takePhoto}
                style={styles.snapContainer}
              >
                <AntDesign name="camera" size={32} color="white" />
              </TouchableOpacity>
            </Camera>
            <View style={styles.wrapperText}>
              <Text
                style={{
                  fontFamily: "RobotoRegular",
                  fontSize: 16,
                  color: "#BDBDBD",
                }}
              >
                Редактировать фото
              </Text>
            </View>
            <View style={styles.form}>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  onFocus={() => {
                    setShowKeybord(true);
                    setFocus("name");
                  }}
                  style={{
                    ...styles.input,
                    fontFamily: "RobotoMedium",
                    fontSize: 16,
                    borderColor: focuses === "name" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Название..."
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  onFocus={() => {
                    setShowKeybord(true);
                    setFocus("map");
                  }}
                  style={{
                    ...styles.input,
                    fontFamily: "RobotoMedium",
                    fontSize: 16,
                    borderColor: focuses === "map" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Местность..."
                  value={state.map}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      map: value,
                    }))
                  }
                />
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={sendPhoto}
                style={styles.sendContainer}
              >
                <Text
                  style={{
                    ...styles.text,
                    fontFamily: "RobotoRegular",
                    fontSize: 16,
                  }}
                >
                  Опубликовать
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  cemera: {
    height: "40%",
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperText: {
    marginTop: 8,
    marginLeft: 16,
  },
  snapContainer: {
    borderWidth: 1,
    borderColor: "#FFF",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  sendContainer: {
    backgroundColor: "#FF6C00",
    marginTop: 32,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  form: {
    marginHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 20,
    height: 50,
    padding: 16,
    color: "black",
  },
});

export default CreatePostsScreen;
