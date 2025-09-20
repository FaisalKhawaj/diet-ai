import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize } from "@/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const UNIT_HEIGHT = 18;          // px per 1 step (1 cm, 1 in, or 1/12 ft)
const RULER_WIDTH = 150;
const DOT_SIZE = 16;
const DOT_LEFT = 12;
const VALUE_GAP = 6;

const LINE_COLOR = "#DCDCDC";
const LINE_THICKNESS = Math.max(2, StyleSheet.hairlineWidth * 2);
const OVERLAP = StyleSheet.hairlineWidth;
const VALUE_BOX_W = 64;
const EPS = 1e-6;
const toInt = (x: number) => Math.round(x + EPS);

type Props = {
  min?: number;
  max?: number;
  initial?: number;
  unitLabel: "cm" | "in" | "ft";
  step?: number;
  formatter?: (value: number, unitLabel?: string) => string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  accent?: string;
  decelerationRate?: "fast" | "normal" | number;
};

export const HeightRulerPicker: React.FC<Props> = ({
  min = 120,
  max = 220,
  initial = 175,
  step = 1,
  unitLabel,
  formatter,
  onChange,
  onChangeEnd,
  accent = "#D9FF48",
  decelerationRate = Platform.select({ ios: "normal", android: 0.985 }) as any,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [rulerH, setRulerH] = useState(0);
  const [value, setValue] = useState<number>(initial);

  // ── Spacing (single source of truth)
  const spacing = UNIT_HEIGHT;

  // The visible “window” is the ruler column height
  const centerOffset = useMemo(
    () => Math.max(0, rulerH / 2 - spacing / 2),
    [rulerH, spacing]
  );

  // Helpers: index <-> y, value <-> index
  const idxFromY = (y: number) => Math.round((y + centerOffset) / spacing);
  const yFromIdx = (idx: number) => idx * spacing - centerOffset;

  const idxFromValue = (v: number) =>
    Math.round((v - min) / step);

  const valueFromIdx = (idx: number) => {
    const raw = min + idx * step;
    const clamped = Math.min(max, Math.max(min, raw));
    return Number(clamped.toFixed(6));
  };

  // Jump to initial when the ruler knows its height or inputs change
  useEffect(() => {
    if (!rulerH) return;
    const idx = idxFromValue(initial);
    const y = yFromIdx(idx);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y, animated: false });
      setValue(initial);
      onChange?.(initial);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rulerH, min, max, initial, step]);

  // Scroll handlers
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = idxFromY(y);
    const v = valueFromIdx(idx);
    if (v !== value) {
      setValue(v);
      onChange?.(v);
    }
  };

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = idxFromY(y);
    const v = valueFromIdx(idx);
    const snapY = yFromIdx(idx);
    // snap exactly to the tick we just calculated from y
    scrollRef.current?.scrollTo({ y: snapY, animated: true });
    setValue(v);
    onChangeEnd?.(v);
  };

  // Items
  const itemCount = Math.round((max - min) / step) + 1;

  function classifyAndLabel(i: number): {
    type: "major" | "mid" | "minor";
    label?: string;
  } {
    const v = min + i * step;

    if (unitLabel === "cm") {
      const cm = toInt(v);
      return {
        type: cm % 10 === 0 ? "major" : cm % 5 === 0 ? "mid" : "minor",
        label: String(cm), // show every cm on the right
      };
    }

    if (unitLabel === "in") {
      const inches = toInt(v);
      return {
        type: inches % 12 === 0 ? "major" : inches % 6 === 0 ? "mid" : "minor",
        label: String(inches),
      };
    }

    // ft mode: min/max are in feet, step is 1/12 ft (1 inch)
    const absInches = toInt(min * 12 + i * step * 12);
    const inches = absInches % 12;
    const feet = Math.floor(absInches / 12);
    return {
      type: inches === 0 ? "major" : inches === 6 ? "mid" : "minor",
      label: `${feet}'${inches}"`,
    };
  }

  return (
    <View style={styles.wrap}>
      {/* LEFT: unit label */}
      <View style={styles.leftColumn} pointerEvents="none">
        <Text style={styles.unitText}>{unitLabel}</Text>
      </View>

      {/* RULER COLUMN */}
      <View
        style={styles.rulerArea}
        onLayout={(e: LayoutChangeEvent) => setRulerH(e.nativeEvent.layout.height)}
      >
        {/* Scrollable ticks */}
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
          decelerationRate={decelerationRate}
          contentContainerStyle={{
            paddingTop: centerOffset,
            paddingBottom: centerOffset,
          }}
        >
          {Array.from({ length: itemCount }).map((_, i) => {
            const { type, label } = classifyAndLabel(i);
            const w =
              type === "major"
                ? RULER_WIDTH
                : type === "mid"
                ? Math.round(RULER_WIDTH * 0.75)
                : Math.round(RULER_WIDTH * 0.55);

            return (
              <View key={i} style={{ height: spacing, justifyContent: "center" }}>
                <View style={[styles.tick, { width: w }]} />
                <Text style={styles.tickLabel}>{label}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* CENTER HAIRLINE (truth) */}
        <View pointerEvents="none" style={styles.centerOverlay}>
          <View style={styles.centerHairline} />
        </View>
      </View>

      {/* CROSS-LINE (dot + left guide) EXACTLY aligned with hairline */}
      <View pointerEvents="none" style={styles.crossline}>
        <View style={[styles.dot, { backgroundColor: accent }]} />
        <View style={styles.crossGuide} />
      </View>

      {/* VALUE ABOVE DOT */}
      <View pointerEvents="none" style={styles.leftValueOverlay}>
        <Text style={styles.leftValue}>
          {formatter?.(value, unitLabel) ?? `${Math.round(value)} ${unitLabel}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff", flexDirection: "row", position: "relative" },

  leftColumn: { flex: 1, paddingTop: 24 },
  unitText: { color: "#000", fontSize: 16, marginLeft: 16, marginBottom: 18 },

  rulerArea: { width: RULER_WIDTH, alignSelf: "stretch", position: "relative" },

  tick: { alignSelf: "flex-start", height: 2, backgroundColor: "#D9D9D9", opacity: 0.9 },
  tickLabel: { position: "absolute", right: 8, top: 2, color: "#000", fontSize: 12 },

  // center hairline in the RULER column
  centerOverlay: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -LINE_THICKNESS / 2 }],
    width: RULER_WIDTH,
    zIndex: 3,
  },
  centerHairline: { width: "100%", height: LINE_THICKNESS, backgroundColor: LINE_COLOR },

  // crossline spans from left column into the ruler and overlaps a hairline by 1px
  crossline: {
    position: "absolute",
    left: DOT_LEFT,
    right: RULER_WIDTH - OVERLAP, // tiny overlap into the ruler to look “connected”
    top: "50%",
    marginTop: -DOT_SIZE / 2,
    height: DOT_SIZE,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
  },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
  crossGuide: { flex: 1, height: LINE_THICKNESS, backgroundColor: LINE_COLOR },

  leftValueOverlay: {
    position: "absolute",
    left: DOT_LEFT + DOT_SIZE / 2 - VALUE_BOX_W / 2,
    top: "50%",
    transform: [{ translateY: -(DOT_SIZE / 2 + VALUE_GAP + 10) }],
    alignItems: "center",
    zIndex: 4,
  },
  leftValue: {
    fontSize: responsiveFontSize(24),
    fontFamily: fonts.primary.primaryBold,
    color: "#000",
  },
});
