import React from "react";
import { Alert, Button, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";

function Home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    const response = await logout();
    if (!response.status) {
      Alert.alert("Logout", response.message);
    }
  };
  return (
    <View>
      <Text>Home is here</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default Home;
