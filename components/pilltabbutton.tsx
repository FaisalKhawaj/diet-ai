// components/PillTabs.tsx
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

export type PillTab = { id: string; label: string };

type Props = {
  options: PillTab[];                   // e.g., [{id:'diet', label:'Diet AI'}, {id:'recipe', label:'Recipe AI'}]
  value: string;                        // active id
  onChange: (id: string) => void;
  style?: ViewStyle;                    // container style
  activePillStyle?: ViewStyle;
  inactiveTextStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  gap?: number;                         // space between tabs
};

export function PillTabButton({
  options,
  value,
  onChange,
  style,
  activePillStyle,
  inactiveTextStyle,
  activeTextStyle,
  gap = 16,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      {options.map((opt, i) => {
        const active = value === opt.id;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
            style={[
              styles.pillBase,
              active && styles.pillActive,
              active && activePillStyle,
              i > 0 && { marginLeft: gap },
            ]}
          >
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive, active && activeTextStyle, !active && inactiveTextStyle]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap:15,
    marginHorizontal:10,
  },
  pillBase: {
    paddingHorizontal: 18,
    flex:1,
    height: 58,
    alignItems:'center',
    borderRadius: 999,
    backgroundColor:'#000',
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: "#F5F5F5", // light grey pill (looks like your screenshot)
    
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  labelActive: {
    color: "#000000", 
        // dark text on light pill
    fontFamily:fonts.primary.primarySemiBold,
    fontSize:responsiveFontSize(18),
    lineHeight:responsiveLineHeight(18,24),
  },
  labelInactive: {
    color: "#fff",   
          // white text on dark background
    fontFamily:fonts.primary.primaryMedium,
    fontSize:responsiveFontSize(18),
    lineHeight:responsiveLineHeight(18,24),

  },
});
