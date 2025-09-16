import { View } from "react-native";

export const Spacer = ({ marginTop = 0, marginBottom = 0 }) => {
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    />
  );
};
