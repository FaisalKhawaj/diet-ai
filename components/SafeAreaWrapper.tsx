import { globalStyles } from "@/globalstyles";
import { ReactNode } from "react";
import { Platform, ViewStyle } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type SafeAreaWrapperProps = {
  children: ReactNode;
  style?: ViewStyle; // allow custom styles per screen
    androidExtraTop?: boolean;
};

export const SafeAreaWrapper = ({ children, style,  androidExtraTop = true, }: SafeAreaWrapperProps) => {
  const insets = useSafeAreaInsets();

    const extraTop =
    Platform.OS === "android" && androidExtraTop ? Math.max(insets.top, 16) : 0;
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
       style={[globalStyles.mainWrap, { paddingTop: extraTop }, style]}
    >
      {children}
    </SafeAreaView>
  );
};
