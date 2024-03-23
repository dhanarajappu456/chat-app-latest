import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../utils/common";
function ChatItem({ index, noBorder, router, item }) {
  const moveToChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
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
            8:00 am
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ChatItem;
