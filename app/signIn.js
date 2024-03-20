import { Fontisto } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
function SignIn() {
  return (
    <View
      className="flex-1"
      style={{
        paddingTop: hp(8),
        paddingHorizontal: hp(4),
      }}
    >
      <StatusBar hidden={false} style="dark" />
      <View className="gap-3">
        <View className="items-center">
          <Image
            resizeMode="contain"
            style={{ height: hp(25) }}
            source={require("../assets/images/login.png")}
          />
        </View>
        <View className="gap-4 ">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          <View
            className="rounded-lg  p-2 items-center flex-row bg-gray-100 gap-4"
            style={{ height: hp(7) }}
          >
            <Fontisto name="email" size={24} color="gray" />
            <TextInput placeholder="Email" />
          </View>
          <View className="gap-3">
            <View
              className=" rounded-lg p-2 items-center flex-row bg-gray-100 gap-4"
              style={{ height: hp(7) }}
            >
              <MaterialIcons name="password" size={24} color="gray" />
              <TextInput placeholder="Password" />
            </View>
            <Pressable>
              <Text className="text-right text-gray-500">Forgot password</Text>
            </Pressable>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "indigo",
              height: "100vh",
            }}
          >
            <TouchableOpacity className="flex-1  justify-center items-center">
              <Text style={{}} className=" text-white">
                Sign In
              </Text>
            </TouchableOpacity>
          </View> */}

          <View
            // style={{
            //   backgroundColor: "indigo",
            //   height: "100vh",
            // }}
            className="bg-indigo-500 rounded-lg"
            style={{ height: hp(7) }}
          >
            <TouchableOpacity
              style={{
                height: hp(7),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white" }}
                className="text-white font-bold tracking-wider"
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-center gap-2">
          <Text className="text-gray-500">Don't have and account?</Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text className="color-indigo-500">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default SignIn;
