import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import React, { memo } from "react";
import {
  I18nManager,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type RadioOption<T extends string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type RadioGroupProps<T extends string | number> = {
  /** Controlled value */
  value: T | null;
  /** List of options */
  options: RadioOption<T>[];
  /** Called with the selected value */
  onChange: (next: T) => void;

  /** Styles & theming */
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /** Row height / pill radius */
  itemHeight?: number; // default 64
  borderRadius?: number; // default itemHeight/2
  /** Colors */
  trackColor?: string; // pill background
  ringColor?: string;  // outer ring when selected
  dotColor?: string;   // inner dot when selected
  ringBorderColor?: string; // ring border (unselected outline)
};

export function RadioGroup<T extends string | number>({
  value,
  options,
  onChange,
  containerStyle,
  itemStyle,
  labelStyle,
  itemHeight = 64,
  borderRadius,
  trackColor = "#F3F3F3",
  ringColor = Colors.light.primaryButton, // neon-lime
  dotColor = Colors.light.primaryButton,
  ringBorderColor = "#E5E5E5",
}: RadioGroupProps<T>) {
  const radius = borderRadius ?? Math.round(itemHeight / 2);
  const isRTL = I18nManager.isRTL;

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((opt) => {
        const selected = value === opt.value;
        const disabled = !!opt.disabled;

        return (
          <Pressable
            key={String(opt.value)}
            onPress={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            style={({ pressed }) => [
              {
                height: itemHeight,
                borderRadius: radius,
                backgroundColor: trackColor,
                opacity: disabled ? 0.6 : pressed ? 0.96 : 1,
              },
              styles.itemRow,
              itemStyle,
            ]}
            hitSlop={8}
          >
            {/* Radio icon */}
            <View
              style={[
                styles.iconWrap,
                isRTL && { marginLeft: 12, marginRight: 18 },
              ]}
            >
              <View
                style={[
                  styles.ring,
                  {
                    borderColor: selected ? ringColor : ringBorderColor,
                    backgroundColor: "#fff",
                  },
                ]}
              >
                {selected && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
              </View>
            </View>

            {/* Label */}
            <Text numberOfLines={1} style={[styles.label, labelStyle]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  itemRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    marginRight: 18,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    flex: 1,
    fontSize:responsiveFontSize(16),
    lineHeight:responsiveLineHeight(16,22),
    color: "#000",
    fontFamily:fonts.secondary.secondaryMedium,
    fontWeight: "500",
  },
});

export const MemoRadioGroup = memo(RadioGroup) as typeof RadioGroup;
