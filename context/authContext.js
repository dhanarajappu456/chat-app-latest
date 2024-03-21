import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    console.log("user is here ", user);
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed");
      if (user) {
        const keys = await AsyncStorage.getAllKeys();

        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      return unsub;
    });
    // setInterval(() => {
    //   setIsAuthenticated(false);
    // }, 3000);
    //on auth change
  }, []);
  //for login
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Logged in..." };
    } catch (e) {
      console.log(e.message);
      return { success: false, message: "Error in logging in" };
    }
  };
  //for logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true, message: "success logout" };
    } catch (e) {
      return { success: false, message: "failed logout" };
    }
  };
  //for register
  const register = async (username, password, email, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("response user", response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user.uid,
      });

      return { success: true, message: "Success Registering" };
    } catch (e) {
      let message = e.message;
      if (message.includes("auth/email-already-in-use"))
        message = "Email exists";
      return { success: false, message: message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("Should be wrapped in context provider");
  }
  return value;
};
