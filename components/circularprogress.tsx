// components/CircularProgress.tsx
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  size?: number;               // ring diameter
  stroke?: number;             // ring thickness
  value: number;               // current
  max: number;                 // max for progress (e.g., grams/day)
  color?: string;              // progress color
  trackColor?: string;         // base track color
  text?: string;               // center text (e.g., "256g")
  subText?: string;            // optional small bottom text
};

export function CircularProgress({
  size = 78,
  stroke = 8,
  value,
  max,
  color = "#76D479",
  trackColor = "#EDEDED",
  text,
  subText,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0));
  const dash = c * pct;

  const numbers = useMemo(
    () => ({
      cx: size / 2,
      cy: size / 2,
      r,
      c,
      dash,
    }),
    [size, r, c, dash]
  );

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={numbers.cx}
          cy={numbers.cy}
          r={numbers.r}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={numbers.cx}
          cy={numbers.cy}
          r={numbers.r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${numbers.dash}, ${numbers.c - numbers.dash}`}
          transform={`rotate(-90 ${numbers.cx} ${numbers.cy})`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.valueText}>{text ?? `${Math.round(value)}`}</Text>
        {!!subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  subText: {
    fontSize: 11,
    color: "#8B8B8B",
    marginTop: 2,
  },
});
