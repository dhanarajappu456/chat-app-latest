import { Fontisto } from "@expo/vector-icons";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { MaterialIcons } from "@expo/vector-icons";
export default function StartPage() {
  // <View className="flex-1 justify-center">
  //   <ActivityIndicator
  //     className="flex-1 justify-center"
  //     size="large"
  //     color="gray"
  //   />
  // </View>
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
            className="rounded-lg  p-2 items-center flex-row bg-gray-200 gap-4"
            style={{ height: hp(6) }}
          >
            <Fontisto name="email" size={24} color="black" />
            <TextInput placeholder="Email" />
          </View>
          <View className="gap-3">
            <View
              className=" rounded-lg p-2 items-center flex-row bg-gray-200 gap-4"
              style={{ height: hp(6) }}
            >
              <MaterialIcons name="password" size={24} color="black" />
              <TextInput placeholder="Password" />
            </View>
            <Text className="text-right">Forgot password</Text>
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
            className="bg-indigo-700 rounded-lg"
            style={{ height: hp(5) }}
          >
            <TouchableOpacity
              style={{
                height: hp(5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
