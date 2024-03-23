import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Platform, Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { blurhash } from "../utils/common";
import CustomMenuItems from "./CustomMenuItems";
function HomeHeader() {
  const { top } = useSafeAreaInsets();

  const { user, logout } = useAuth();

  const handleProfile = () => {};
  const handleLogout = async () => {
    const response = await logout();
  };
  return (
    <>
      <View
        style={{ paddingTop: Platform.OS == "ios" ? top : top + 24 }}
        className=" px-5 flex-row justify-between pb-6 bg-indigo-400 rounded-b-3xl shadow items-center"
      >
        <Text style={{ fontSize: hp(4) }} className="text-white  font-medium">
          Chats
        </Text>

        <View>
          <Menu>
            <MenuTrigger>
              <Image
                style={{ height: 50, width: 50, borderRadius: 25 }}
                source={user?.profileUrl}
                placeholder={blurhash}
                contentFit="cover"
                transition={500}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: 10,
                  marginTop: 40,
                  marginLeft: -30,
                  backgroundColor: "white",
                  elevation: 20,
                  width: 160,
                },
              }}
            >
              <CustomMenuItems
                text="Profile"
                action={handleProfile}
                value={null}
                icon={
                  <Feather
                    name="user"
                    style={{ fontSize: hp(3) }}
                    className="font-medium text-white"
                  />
                }
              />
              <Divider />

              <CustomMenuItems
                text="Logout"
                action={handleLogout}
                value={null}
                icon={<MaterialIcons name="logout" size={24} color="black" />}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </>
  );
}

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};
export default HomeHeader;
