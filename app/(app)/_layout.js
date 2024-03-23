import { Stack } from "expo-router";
import React from "react";
import HomeHeader from "../../components/HomeHeader";
function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
}

export default Layout;
