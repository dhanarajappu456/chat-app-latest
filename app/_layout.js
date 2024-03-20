import { router, Slot, useSegments } from "expo-router";

// Import your global CSS file
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    //check user authenticaed ot not

    console.log("segments ", segments);

    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      console.log("first", segments[0]);
      //redirect home
      router.replace("home");
    } else if (isAuthenticated == false) {
      //redirect signin
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
