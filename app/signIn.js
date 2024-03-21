import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
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
import { useRef } from "react";
import CustomKeyBoardView from "../components/CustomKeyBoardView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("SignIn", "Either email or password is missing...");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);

    setLoading(false);
    Alert.alert("Login", response.message);
  };

  const [loading, setLoading] = useState(false);

  return (
    <CustomKeyBoardView>
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
              <TextInput
                className="flex-1"
                onChangeText={(val) => {
                  emailRef.current = val;
                }}
                placeholder="Email"
              />
            </View>
            <View className="gap-3">
              <View
                className=" rounded-lg p-2 items-center flex-row bg-gray-100 gap-4"
                style={{ height: hp(7) }}
              >
                <MaterialIcons name="password" size={24} color="gray" />
                <TextInput
                  className="flex-1"
                  secureTextEntry
                  onChangeText={(val) => {
                    passwordRef.current = val;
                  }}
                  placeholder="Password"
                />
              </View>
              <Pressable>
                <Text className="text-right text-gray-500">
                  Forgot password
                </Text>
              </Pressable>
            </View>
            <View className="">
              {loading ? (
                <View className="items-center">
                  <Loading size={15} />
                </View>
              ) : (
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
                    onPress={handleLogin}
                  >
                    <Text
                      style={{ color: "white" }}
                      className="text-white font-bold tracking-wider"
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
    </CustomKeyBoardView>
  );
}

export default SignIn;
