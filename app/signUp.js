import { AntDesign, Fontisto } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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
import CustomKeyBoardView from "../components/CustomKeyBoardView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

function SignUp() {
  const userNameRef = useRef(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const profileRef = useRef(null);

  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSignUp = async () => {
    if (
      !userNameRef.current ||
      !passwordRef.current ||
      !emailRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Signup", "Some fields are missing...");
      return;
    }

    setLoading(true);
    const response = await register(
      userNameRef.current,
      passwordRef.current,
      emailRef.current,
      profileRef.current
    );
    setLoading(false);
    Alert.alert("SignUp", response.message);

    return;
  };
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
              source={require("../assets/images/register.png")}
            />
          </View>
          <View className="gap-4 ">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center text-neutral-800"
            >
              Sign Up
            </Text>
            <View
              className="rounded-lg  p-2 items-center flex-row bg-gray-100 gap-4"
              style={{ height: hp(7) }}
            >
              <AntDesign name="user" size={24} color="gray" />
              <TextInput
                className="flex-1"
                onChangeText={(val) => (userNameRef.current = val)}
                placeholder="Username"
              />
            </View>
            <View
              className="rounded-lg  p-2 items-center flex-row bg-gray-100 gap-4"
              style={{ height: hp(7) }}
            >
              <Fontisto name="email" size={24} color="gray" />
              <TextInput
                className="flex-1"
                onChangeText={(val) => (emailRef.current = val)}
                placeholder="Email"
              />
            </View>
            <View
              className=" rounded-lg p-2 items-center flex-row bg-gray-100 gap-4"
              style={{ height: hp(7) }}
            >
              <MaterialIcons name="password" size={24} color="gray" />
              <TextInput
                className="flex-1"
                onChangeText={(val) => (passwordRef.current = val)}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <View
              className="rounded-lg  p-2  flex-row items-center bg-gray-100 gap-4"
              style={{ height: hp(7) }}
            >
              <AntDesign name="profile" size={24} color="gray" />
              <TextInput
                className="flex-1"
                onChangeText={(val) => (profileRef.current = val)}
                placeholder="ProfileUrl"
              />
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

            <View>
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
                    onPress={handleSignUp}
                  >
                    <Text
                      style={{ color: "white" }}
                      className="text-white font-bold tracking-wider"
                    >
                      SignUp
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View className="flex-row justify-center gap-2">
              <Text className="text-gray-500">Already have an account?</Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text className="color-indigo-500">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

export default SignUp;
