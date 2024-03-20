import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function Loading({ size }) {
  return (
    <View
      style={{
        shadowColor: "white",
        height: hp(size),
        aspectRatio: 1,
      }}
    >
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/images/load.json")}
        autoPlay
        loop
      />
    </View>
  );
}

export default Loading;
