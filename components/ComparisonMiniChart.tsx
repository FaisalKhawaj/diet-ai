// ComparisonMiniChart.tsx
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type Props = {
  leftLabel?: string;
  rightLabel?: string;
  leftValueText?: string;
  rightValueText?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export function ComparisonMiniChart({
  leftLabel = `without\nDiet AI`,
  rightLabel = "with\nDiet AI",
  leftValueText = "20%",
  rightValueText = "2x",
  style,
  labelStyle,
}: Props) {
  return (
    <View style={[styles.card, style]}>
      {/* dotted grid */}
      <View pointerEvents="none" style={styles.grid}>
        {[0.25, 0.5, 0.75].map((p) => (
          <View key={p} style={[styles.gridLine, { top: `${p * 100}%` }]} />
        ))}
      </View>

      {/* labels on the SAME LINE */}
      <View style={styles.header}>
        <View style={styles.labelBox}>
          <Text style={[styles.topLabel, labelStyle]} numberOfLines={2}>
            {leftLabel}
          </Text>
        </View>
        <View style={styles.labelBox}>
          <Text style={[styles.topLabel, labelStyle]} numberOfLines={2}>
            {rightLabel}
          </Text>
        </View>
      </View>
      {/* bars */}
      <View style={styles.barsRow}>
        <View style={[styles.bar, styles.leftBar]}>
          <Text style={styles.leftValue}>{leftValueText}</Text>
        </View>
        <View style={[styles.bar, styles.rightBar]}>
          <Text style={styles.rightValue}>{rightValueText}</Text>
        </View>
      </View>
    </View>
  );
}

const CARD_HEIGHT = 260;
const BAR_WIDTH = 96;

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    backgroundColor: "#F4F4F4",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 16,
    overflow: "hidden",
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    left: 12,
    right: 12,
  },
  gridLine: {
    position: "absolute",
    height: 1,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
    borderStyle: "dashed",
  },

  /* NEW: keep labels in their own row so they align */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 0,
  },
  labelBox: {
    width: BAR_WIDTH,
    alignItems: "center",
  },
  topLabel: {
    fontSize:responsiveFontSize(16) ,
    color: "#111",
    fontFamily:fonts.primary.primaryBold,
    lineHeight: responsiveLineHeight(16,22),
    textAlign: "center",
  },

  /* bars row stays independent */
  barsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 16,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  leftBar: {
    height: 72,
    backgroundColor: "#A9A9A9",
  },
  rightBar: {
    height: 180,
    backgroundColor: "#D9FF48",
  },
  leftValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  rightValue: {
    color: "#111",
    fontWeight: "800",
    fontSize: 22,
  },
});
