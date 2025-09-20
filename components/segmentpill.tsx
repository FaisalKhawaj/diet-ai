import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

export type SegItem = { id: string; label: string };

type Props = {
  options: SegItem[];
  value: string;                          // active id
  onChange: (id: string) => void;
  style?: ViewStyle;
  activeTextStyle?: TextStyle;
  inactiveTextStyle?: TextStyle;
  pillStyle?: ViewStyle;                  // extra style for inactive pill
  activePillStyle?: ViewStyle;            // new: extra style for selected pill
  gap?: number;
};

export function SegmentedPills({
  options,
  value,
  onChange,
  style,
  activeTextStyle,
  inactiveTextStyle,
  pillStyle,
  activePillStyle,
  gap = 8,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      {options.map((opt, i) => {
        const active = value === opt.id;
        return (
          <TouchableOpacity
            key={opt.id}
            onPress={() => onChange(opt.id)}
            activeOpacity={0.8}
            style={[
              styles.pillBase,
              active ? [styles.selectedPill, activePillStyle] : [styles.inactivePill, pillStyle],
              i > 0 && { marginLeft: gap },
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[active ? styles.activeText : styles.inactiveText, active ? activeTextStyle : inactiveTextStyle]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  pillBase: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  inactivePill: {
    backgroundColor: "#EFEFEF",
  },
  selectedPill: {
    backgroundColor: "#000", // 👈 your requested color
  },
  activeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  inactiveText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "600",
  },
});
