import { globalStyles } from "@/globalstyles";
import React, { ReactNode } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  type Edge,
} from "react-native-safe-area-context";

type SafeAreaWrapperProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Override safe-area edges per screen; defaults to all edges */
  edges?: readonly Edge[];
  /** Adds extra top padding on Android (in addition to insets) */
  androidExtraTop?: boolean;
};

export const SafeAreaWrapper = ({
  children,
  style,
  edges = ["top", "left", "right", "bottom"],
  androidExtraTop = true,
}: SafeAreaWrapperProps) => {
  const insets = useSafeAreaInsets();

  // Only add extra top space on Android when the 'top' edge is being used
  const shouldAddTop =
    Platform.OS === "android" && androidExtraTop && edges.includes("top");
  const extraTop = shouldAddTop ? Math.max(insets.top, 16) : 0;

  return (
    <SafeAreaView
      edges={edges}
      style={[globalStyles.mainWrap, { paddingTop: extraTop }, style]}
    >
      {children}
    </SafeAreaView>
  );
};
