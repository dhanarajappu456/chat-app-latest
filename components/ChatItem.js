import { Image } from "expo-image";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomId } from "../utils/common";
function ChatItem({ index, noBorder, router, item, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(() => {
    //get the chatroom id and get the messages in the most recent to least recent
    //and show it under each chat
    const roomId = getRoomId(item?.userId, currentUser?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
      return unsub;
    });
  }, []);
  //move to chat when clicked a chatitem(person) in home
  const moveToChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };
  // render time in the chatlist for each chat item(person)
  const renderTime = () => {
    //returns{"nanoseconds": 779000000, "seconds": 1711209399}
    let date = lastMessage?.createdAt;
    if (date) return formatDate(new Date(date?.seconds * 1000));
  };
  // to render the last message for each chat item
  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";

    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId)
        return "You:" + lastMessage?.text;
      return lastMessage.text;
    } else {
      return "Say Hi 👋";
    }
  };

  return (
    <TouchableOpacity
      onPress={moveToChatRoom}
      style={{
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "black",
        marginBottom: 9,
        paddingBottom: 6,
        borderBottomWidth: noBorder ? 0 : 0.5,
        borderBottomColor: "#CCCCCC",
        marginHorizontal: 6,
      }}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-2">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {lastMessage ? renderTime() : "no-chat"}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ChatItem;
