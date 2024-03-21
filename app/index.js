import { useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import React from "react";
import { useAuth } from "../context/authContext";
// for loading indicator
//index.js is the main route = /
export default function StartPage() {
  const seg = useSegments();
  const { isAuthenticated } = useAuth();
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator
        className="flex-1 justify-center"
        size="large"
        color="gray"
      />
    </View>
  );
}
