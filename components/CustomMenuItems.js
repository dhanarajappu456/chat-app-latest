import React from "react";
import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";

function CustomMenuItems({ text, action, value, icon }) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text className="">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
}

export default CustomMenuItems;
