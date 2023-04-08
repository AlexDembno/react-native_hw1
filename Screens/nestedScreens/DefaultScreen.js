import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

function DefaultScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  console.log(route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.img} />
            <View style={styles.postMenu}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("CommentsScreen")}
              >
                <EvilIcons name="comment" size={30} color="#BDBDBD" />
                <Text style={styles.number}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("MapScreen")}
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
