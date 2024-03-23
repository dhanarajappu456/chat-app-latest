import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatHeader from "../../components/ChatHeader";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../utils/common";
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const item = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [sound, setSound] = useState({});
  const inputRef = useRef(null);

  const textRef = useRef(null);
  useEffect(() => {
    createRoomIfNotExists();
    getSound();

    let roomId = getRoomId(user?.userId, item?.userId);

    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    return unsub;
  }, []);

  const getSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/send.mp3")
    );

    setSound(sound);
    //await sound.playAsync();
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    } else {
      console.error("Sound not loaded");
    }
  };

  const handleSend = async () => {
    playSound();
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      inputRef.current.clear();
      textRef.current = "";

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (err) {
      Alert.alert("Message", err.message);
    }
  };

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId(user?.userId, item?.userId);

    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    //let message  = textRef.curr
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <ChatHeader user={item} router={router} />
      <View className="h-1 border-b border-neutral-200" />
      <View className="flex-1 bg-white overflow-visible">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="pl-2 pr-2 flex-1 bg-white"
        >
          <MessageList messages={messages} currentUserId={user?.userId} />
        </ScrollView>
        <View className="flex-row  justify-between p-2 rounded-full bg-white border border-neutral-300">
          <TextInput
            ref={inputRef}
            className="flex-1 mr-2"
            placeholder="Type message..."
            onChangeText={(val) => (textRef.current = val)}
          ></TextInput>
          <View className="bg-neutral-200 p-2 rounded-full">
            <TouchableOpacity onPress={handleSend}>
              <FontAwesome name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ChatRoom;
