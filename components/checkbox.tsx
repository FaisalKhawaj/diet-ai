

import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
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

export type CheckboxOption<T extends string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type CheckboxGroupProps<T extends string | number> = {
  /** Controlled array of selected values */
  values: T[];
  /** List of options */
  options: CheckboxOption<T>[];
  /** Called with next selected array */
  onChange: (next: T[]) => void;

  /** Styles & theming */
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemHeight?: number; // default 64
  borderRadius?: number; // default itemHeight/2
  trackColor?: string;
  checkColor?: string;
  checkBorderColor?: string;
  checkBgColor?: string;
};

export function CheckboxGroup<T extends string | number>({
  values,
  options,
  onChange,
  containerStyle,
  itemStyle,
  labelStyle,
  itemHeight = 64,
  borderRadius,
  trackColor = "#F3F3F3",
  checkColor = Colors.light.activeDot, // ✅ tick + filled bg
  checkBorderColor = "#E5E5E5",
  checkBgColor = "#FFF",
}: CheckboxGroupProps<T>) {
  const radius = borderRadius ?? Math.round(itemHeight / 2);
  const isRTL = I18nManager.isRTL;

  const toggleValue = (val: T) => {
    const isSelected = values.includes(val);
    if (isSelected) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((opt) => {
        const selected = values.includes(opt.value);
        const disabled = !!opt.disabled;

        return (
          <Pressable
            key={String(opt.value)}
            onPress={() => !disabled && toggleValue(opt.value)}
            disabled={disabled}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected, disabled }}
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
            {/* Checkbox square */}
            <View style={[styles.iconWrap, isRTL && { marginLeft: 12, marginRight: 18 }]}>
              <View
                style={[
                  styles.checkBox,
                  {
                    borderColor: selected ? checkColor : checkBorderColor,
                    backgroundColor: selected ? checkColor : checkBgColor,
                  },
                ]}
              >
                {selected && <Ionicons name="checkmark" size={16} color="#fff" />}
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
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 22),
    color: "#000",
    fontFamily: fonts.secondary.secondaryMedium,
    fontWeight: "500",
  },
});

export const MemoCheckboxGroup = memo(CheckboxGroup) as typeof CheckboxGroup;

