import React from "react";
import { View } from "react-native";
import MessageItem from "./MessageItem";

function MessageList({ messages, currentUserId }) {
  return (
    <View className="bg-white">
      {messages.map((message, index) => {
        return (
          <MessageItem
            message={message}
            key={index}
            currentUserId={currentUserId}
          />
        );
      })}
    </View>
  );
}

export default MessageList;
