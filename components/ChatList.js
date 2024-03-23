import { router } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";
function ChatList({ users, currentUser }) {
  return (
    <View className="mt-2">
      {/* <View className="flex-row items-center justify-between">
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
          transition={5000}
          placeholder={blurhash}
        />
        <Text className="text-gray-400 font-thin">8:00PM</Text>
      </View>

      <View className="m-2 bg-gray-200" style={{ height: 1 }} /> */}

      <FlatList
        data={users}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            router={router}
            noBorder={index + 1 == users.length}
            item={item}
            index={index}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
}

export default ChatList;
