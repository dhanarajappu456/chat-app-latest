import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function ChatHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => {
          return (
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Ionicons name="chevron-back-sharp" size={24} color="black" />
              </TouchableOpacity>
              <View className="flex-row gap-3 items-center">
                <Image
                  source={user?.profileUrl}
                  style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                />
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="text-neutral-700 font-medium tracking-wider"
                >
                  {user.username}
                </Text>
              </View>
            </View>
          );
        },
        headerRight: () => {
          return (
            <View className="flex-row gap-8 items-center">
              <Ionicons name="call" size={24} color="#737373" />
              <Ionicons name="videocam" size={24} color="#737373" />
            </View>
          );
        },
      }}
    />
  );
}

export default ChatHeader;
