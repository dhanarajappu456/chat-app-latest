import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

function CustomKeyBoardView({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CustomKeyBoardView;
