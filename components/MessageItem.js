import React from "react";
import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function MessageItem({ message, currentUserId, index }) {
  if (currentUserId == message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }} className="">
          <View className=" flex  self-end p-3 rounded-2xl border  bg-white border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-row justify-start mb-3 ml-3">
        <View style={{ width: wp(80) }} className="">
          <View className=" flex  self-start p-3 rounded-2xl border bg-indigo-100 border-indigo-200 ">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default MessageItem;
