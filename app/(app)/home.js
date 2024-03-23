import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { userRef } from "../../firebaseConfig";

function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);
  const handleLogout = async () => {
    const response = await logout();
    if (!response.status) {
      Alert.alert("Logout", response.message);
    }
  };

  const getUsers = async () => {
    //fetch users
    const q = query(userRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setUsers(data);
  };

  return (
    // <>
    //   <View className="p-3" style={{ flex: 1 }}>
    //     <ScrollView
    //       overScrollMode="never"
    //       showsVerticalScrollIndicator={false}
    //       style={{ flex: 1 }}
    //     >
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //       <ChatList />
    //     </ScrollView>
    //   </View>
    //   <Button title="Logout" onPress={handleLogout} />
    // </>
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex-1   justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

export default Home;
