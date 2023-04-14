import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { onSnapshot } from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

function CommentsScreen({ navigation, route }) {
  const [showKeybord, setShowKeybord] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState("");
  const [focuses, setFocus] = useState("");
  const { id } = route.params.postId;
  const { userId, login } = useSelector((state) => state.auth);
  const createComment = async () => {
    try {
      const docRef = await doc(db, "posts", id);
      await addDoc(collection(docRef, "comments"), {
        comments,
        userId,
        login,
        createdAt: Date.now().toString(),
      });
    } catch (error) {
      console.log("comments.error", error.message);
    }
  };

  const getAllPosts = async () => {
    const docRef = await doc(db, "posts", id);
    const q = query(collection(docRef, "comments"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts([...posts]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handlSubmit = () => {
    createComment();
    Keyboard.dismiss();
    setComments("");
    setShowKeybord(false);
    setFocus("");
  };

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: posts.photo }} style={styles.img} /> */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item, index }) => (
          <View
            style={
              index % 2 === 0 ? styles.postCommentOdd : styles.postCommentEven
            }
          >
            <View
              style={index % 2 === 0 ? styles.commentOdd : styles.commentEven}
            >
              <Text
                style={
                  index % 2 === 0
                    ? styles.commentTextOdd
                    : styles.commentTextEven
                }
              >
                {item.comments}
              </Text>
              <Text>{item.login}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.input}>
        <TextInput
          onFocus={() => {
            setShowKeybord(true);
            setFocus("comments");
          }}
          style={{
            fontFamily: "RobotoMedium",
            fontSize: 16,
            borderColor: focuses === "comments" ? "#FF6C00" : "#E8E8E8",
          }}
          placeholder="Комментировать..."
          placeholderTextColor="#BDBDBD"
          value={comments}
          onChangeText={(value) => setComments(value)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handlSubmit}
        >
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
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
  postCommentOdd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  postCommentEven: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  commentOdd: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  commentEven: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 16,
  },
  commentTextOdd: {
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "#212121",
    marginBottom: 8,
  },
  commentTextEven: {
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "#212121",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "F6F6F6",
    borderRadius: 100,
    padding: 16,
    marginBottom: 5,
    marginTop: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "orange",
    width: 34,
    height: 34,
    borderRadius: 50,
    padding: 5,
  },
  btnText: {
    textAlign: "center",
  },
});

export default CommentsScreen;
