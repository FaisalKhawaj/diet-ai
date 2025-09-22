import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ModalLayout() {
  return (
    <Stack
    screenOptions={{
      presentation: Platform.select({ ios: "formSheet", default: "modal" }),
      // 👇 This is key: ensures the card itself paints a background
    //   contentStyle: { backgroundColor: "white" },
      headerLargeTitle: false,
    }}
  />
  );
}