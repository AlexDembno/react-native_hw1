import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { authSingOut } from "../../redux/auth/authOperation";

import { where, onSnapshot } from "firebase/firestore";

function DefaultScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSingOut());
  };

  const getAllPosts = async () => {
    // const querySnapshot = await getDocs(collection(db, "posts"));
    // querySnapshot.forEach((doc) => {
    //   setPosts([{ ...doc.data(), id: doc.id }]);

    const q = await query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts([...posts]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Публикации</Text>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons
            style={{ marginLeft: "auto", marginBottom: 10, paddingRight: 16 }}
            name="logout"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

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
                <EvilIcons name="comment" size={30} color="#BDBDBD" />
                <Text style={styles.number}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() =>
                  navigation.navigate("Геолокация", { location: item })
                }
              >
                <EvilIcons name="location" size={30} color="#BDBDBD" />
                <Text style={styles.text}>Геолокация</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "column",
    // flexWrap: "wrap",
  },
  title: {
    marginTop: 40,
    textAlign: "center",
    color: "#212121",
    fontSize: 28,
  },
  img: {
    marginHorizontal: 10,
    height: 200,
    marginTop: 10,
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
    color: "#BDBDBD",
    fontSize: 20,
  },
  text: {
    marginRight: 10,
    marginLeft: 8,
    color: "#212121",
    fontSize: 16,
  },
});

export default DefaultScreen;
