import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveHeight } from "@/utils";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  textColor?: string;
  height?: number;
  borderRadius?: number;
  fontSize?: number;
};

export const LabelButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor = Colors.light.primaryButton,
  textColor = Colors.light.heading,
  height = 60,
  borderRadius = 50,
  fontSize = 18,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: responsiveHeight(height),
          backgroundColor,
          borderRadius,
        },
        styles.buttonStyle,
        style,
      ]}
    >
      <ThemedText
        darkColor={Colors.dark.heading}
        lightColor={textColor}
        style={{
          fontSize: responsiveFontSize(fontSize),
          fontFamily: fonts.primary.primarySemiBold,
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
