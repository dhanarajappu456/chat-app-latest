import { router, Slot, useSegments } from "expo-router";

// Import your global CSS file
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    //This got executed  when there is a auth change
    // to redirect to appropriate screens

    if (typeof isAuthenticated == "undefined") {
      return;
    }
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      //replace and redirect to home
      router.replace("home");
    } else if (isAuthenticated == false) {
      //replace and redirect to sign in

      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
