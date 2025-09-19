import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import React, { useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

type Point = { x: number; y: number };

type WeightChartProps = {
  style?: ViewStyle;
  /** Chart inner size (not card) */
  width?: number;    // default 320
  height?: number;   // default 180
  /** Padding inside the plotting area */
  padding?: { top: number; right: number; bottom: number; left: number };

  /** Values normalized 0..1 (0 = bottom, 1 = top). X is evenly spaced. */
  normalDiet: number[];
  calAI: number[];

  /** Labels & colors */
  title?: string;
  leftLabel?: string;
  rightLabel?: string;

  colorRed?: string;    // line
  colorRedFill?: string; // area fill
  colorLime?: string;   // line
  colorLimeFill?: string; // area fill
  /** Line thickness */
  strokeWidth?: number;
  /** Curve “tension” for smoothing (0–1.2 is reasonable) */
  tension?: number;
};

export const WeightChart: React.FC<WeightChartProps> = ({
  style,
  width = 320,
  height = 180,
  padding = { top: 10, right: 12, bottom: 16, left: 12 },

  title = "Your Weight",
  leftLabel = "Day 0",
  rightLabel = "1 Year",

  normalDiet,
  calAI,

  colorRed = "#E75A5A",
  colorRedFill = "rgba(231, 90, 90, 0.15)",
  colorLime = "#D6FF5B",
  colorLimeFill = "rgba(214, 255, 91, 0.20)",
  strokeWidth = 3,
  tension = 1,
}) => {
  const w = width;
  const h = height;
  const plotW = w - padding.left - padding.right;
  const plotH = h - padding.top - padding.bottom;

  // Map values (0..1) into points in plotting space (left->right, bottom->top).
  const buildPoints = (arr: number[]): Point[] => {
    const n = arr.length;
    if (n <= 1) return [{ x: padding.left, y: padding.top + plotH }];
    return arr.map((v, i) => {
      const x = padding.left + (i * plotW) / (n - 1);
      const y = padding.top + (1 - clamp01(v)) * plotH;
      return { x, y };
    });
  };

  const ptsRed = useMemo(() => buildPoints(normalDiet), [normalDiet, w, h]);
  const ptsLime = useMemo(() => buildPoints(calAI), [calAI, w, h]);

  const redLine = useMemo(() => catmullRomPath(ptsRed, tension), [ptsRed, tension]);
  const limeLine = useMemo(() => catmullRomPath(ptsLime, tension), [ptsLime, tension]);

  const redArea = useMemo(
    () => areaPath(ptsRed, padding.left, padding.top + plotH, padding.right),
    [ptsRed, plotH]
  );
  const limeArea = useMemo(
    () => areaPath(ptsLime, padding.left, padding.top + plotH, padding.right),
    [ptsLime, plotH]
  );

  return (
    <View style={[styles.card, style]}>
      {/* Title + Legend */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.legendRow}>
          <LegendDot color={colorRed} />
          <Text style={styles.legendText}>Normal Diet</Text>
          <LegendDot color={colorLime} />
          <Text style={styles.legendText}>Cal AI</Text>
        </View>
      </View>

      {/* Chart */}
      <Svg width={w} height={h}>
        <Defs>
          {/* Soft fades from line color to transparent (optional – we also use rgba fill) */}
          <LinearGradient id="redFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colorRedFill} />
            <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </LinearGradient>
          <LinearGradient id="limeFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colorLimeFill} />
            <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </LinearGradient>
        </Defs>

        {/* Areas first (so lines render above) */}
        <Path d={limeArea} fill={colorLimeFill} />
        <Path d={redArea} fill={colorRedFill} />

        {/* Smooth lines */}
        <Path d={limeLine} stroke={colorLime} strokeWidth={strokeWidth} fill="none" />
        <Path d={redLine} stroke={colorRed} strokeWidth={strokeWidth} fill="none" />
      </Svg>

      {/* Bottom labels */}
      <View style={styles.footerRow}>
        <Text style={styles.axisText}>{leftLabel}</Text>
        <Text style={styles.axisText}>{rightLabel}</Text>
      </View>
    </View>
  );
};

/* ---------- utils ---------- */

function clamp01(v: number) {
  "worklet"; // harmless in non-Reanimated envs
  return Math.max(0, Math.min(1, v));
}

/** Catmull–Rom to cubic Bézier path (closed = false). */
function catmullRomPath(points: Point[], tension = 1): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/** Area path from line points to the baseline (yBottom). */
function areaPath(points: Point[], xLeft: number, yBottom: number, _xRightPad: number): string {
  if (points.length === 0) return "";
  const line = catmullRomPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x},${yBottom} L${first.x},${yBottom} Z`;
}

/* ---------- small bits ---------- */

const LegendDot = ({ color }: { color: string }) => (
  <View style={[styles.dot, { backgroundColor: color }]} />
);

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.light.cardBackground,
    padding: 12,
    // subtle card shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize:responsiveFontSize(16),
    lineHeight:responsiveLineHeight(16,20),
    fontFamily:fonts.primary.primaryBold,
    color: "#111",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    marginRight: 10,
    fontSize:responsiveFontSize(12),
    fontFamily:fonts.secondary.secondaryRegular,
    color: "#666",
  },
  footerRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  axisText: {
    fontSize: 12,
    color: "#7A7A7A",
  },
});
