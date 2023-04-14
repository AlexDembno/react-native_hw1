import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { authSingOut } from "../../redux/auth/authOperation";
import { db } from "../../firebase/config";

import { collection, query, where, getDocs } from "firebase/firestore";

function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSingOut());
  };

  const getPostUser = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    console.log("userId", userId);

    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
      setPosts([...posts]);
      console.log(doc.id, " => ", doc.data());
    });
  };
  console.log("posts", posts);

  useEffect(() => {
    getPostUser();
  }, []);

  return (
    <ImageBackground
      style={styles.image}
      source={require("../../assets/images/photoBackground.jpg")}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons
            style={{ marginLeft: "auto", paddingRight: 16 }}
            name="logout"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.login}>{login}</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.createdAt}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photo }} style={styles.img} />
              <View style={styles.postMenu}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() =>
                    navigation.navigate("Комментарии", { postId: item })
                  }
                >
                  <EvilIcons name="comment" size={30} color="#fff" />
                  <Text style={styles.number}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() =>
                    navigation.navigate("Геолокация", { location: item })
                  }
                >
                  <EvilIcons name="location" size={30} color="#fff" />
                  <Text style={styles.text}>Геолокация</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  img: {
    marginHorizontal: 10,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  postMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 19,
    marginBottom: 10,
  },
  number: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 20,
  },
  text: {
    marginRight: 10,
    marginLeft: 8,
    color: "#fff",
    fontSize: 16,
  },
  login: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    marginBottom: 10,
  },
});

export default ProfileScreen;
