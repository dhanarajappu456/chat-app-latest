import { useSegments } from "expo-router";
import React from "react";
import { Text } from "react-native";

function Home() {
  const segments = useSegments();
  console.log("inhome", segments);
  return <Text>Home is here</Text>;
}

export default Home;
