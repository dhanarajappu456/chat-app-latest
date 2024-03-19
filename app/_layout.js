import { Slot } from "expo-router";

// Import your global CSS file
import { View } from "react-native";
import "../global.css";
const Layout = () => {
  return (
    <View className="flex-1 ">
      <Slot />
    </View>
  );
};
export default Layout;
