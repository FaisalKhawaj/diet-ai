
/* eslint-disable react-native/no-inline-styles */
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

type Props = {
  min?: number;                 // e.g. 120
  max?: number;                 // e.g. 220
  initial?: number;             // e.g. 175
  unitLabel: "cm" | "in" | "ft";
  step?: number;                // 1 for cm/in, 1/12 for ft if using inches tick
  formatter?: (v: number, unit?: string) => string;
  onChange?: (v: number) => void;
  onChangeEnd?: (v: number) => void;
  accent?: string;              // lime dot color
  decelerationRate?: "fast" | "normal" | number;
};



/** --- tune these to match design density exactly --- */
const UNIT_HEIGHT = 18;         // px per 1 step
const RULER_WIDTH = 150;        // width of tick column
const DOT_SIZE = 16;
const DOT_LEFT = 12;
const VALUE_GAP = 6;
const LINE_COLOR = "#DCDCDC";
const LABEL_COLOR = "#9B9B9B";
const TICK_COLOR = "#D9D9D9";
const LINE_THICKNESS = Math.max(2, StyleSheet.hairlineWidth * 2);
const OVERLAP = StyleSheet.hairlineWidth;
const ANCHOR_PCT = 0.44;
const EPS = 1e-6;
const toInt = (x: number) => Math.round(x + EPS);

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
  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

  const safeInitial = useMemo(() => {
    const n = Number(initial);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }, [initial, min, max]);

  // const [value, setValue] = useState<number>(initial);
  const [value, setValue] = useState<number>(safeInitial);

  // Dynamic width for the “191 cm” bubble so it stays centered above the dot
  const [valW, setValW] = useState(0);

  // One source of truth for vertical spacing
  const spacing = UNIT_HEIGHT;

  // The visual center of the ruler column, where the hairline/dot sits
  const centerOffset = useMemo(
    () => Math.max(0, rulerH / 2 - spacing / 2),
    [rulerH, spacing]
  );

  // ✅ add:
const anchor = useMemo(() => {
  if (!rulerH) return 0;
  return Math.round(rulerH * ANCHOR_PCT);
}, [rulerH]);

const padTop  = Math.max(0, anchor - spacing / 2);
const padBot  = Math.max(0, rulerH ? (rulerH - anchor - spacing / 2) : 0);

  // Helpers: index <-> y, value <-> index
  const idxFromY = (y: number) => Math.round(y / spacing);

  const yFromIdx = (idx: number) => idx * spacing;


 
  

  const idxFromValue = (v: number) => Math.round((v - min) / step);

  const valueFromIdx = (idx: number) => {
    const raw = min + idx * step;
    const clamped = Math.min(max, Math.max(min, raw));
    return Number(clamped.toFixed(6));
  };

useEffect(() => {
  if (!rulerH) return;
  const idx = idxFromValue(safeInitial);
  const y = yFromIdx(idx);
  requestAnimationFrame(() => {
    scrollRef.current?.scrollTo({ y, animated: false });
    setValue(safeInitial);
    onChange?.(safeInitial);
  });
}, [rulerH, safeInitial, step]);

  // Live update while scrolling
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = idxFromY(y);
    const v = valueFromIdx(idx);
    if (v !== value) {
      setValue(v);
      onChange?.(v);
    }
  };

  

  // Snap to the nearest tick and emit final value
  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = idxFromY(y);
    const v = valueFromIdx(idx);
    const snapY = yFromIdx(idx);
    scrollRef.current?.scrollTo({ y: snapY, animated: true });
    setValue(v);
    onChangeEnd?.(v);
  };

  

  // How many items to render
  // const itemCount = Math.round((max - min) / step) + 1;
  const itemCount = Math.floor(((max - min) / step) + EPS) + 1;

  // Decide tick length + label for each row
  function classifyAndLabel(i: number): {
    type: "major" | "mid" | "minor";
    label?: string;
  } {
    const v = min + i * step;

    if (unitLabel === "cm") {
      const cm = toInt(v);
      return {
        type: cm % 10 === 0 ? "major" : cm % 5 === 0 ? "mid" : "minor",
        label: String(cm), // show per-cm numbers on the right column (like your mock)
      };
    }

    if (unitLabel === "in") {
      const inches = toInt(v);
      return {
        type: inches % 12 === 0 ? "major" : inches % 6 === 0 ? "mid" : "minor",
        label: String(inches),
      };
    }

    // Feet mode — one step is 1 inch (step=1/12). Label as 5'11"
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
      {/* Spacer so the ruler sits on the right half like the design.
          If you want the left unit text column again, replace this <View /> with your left column. */}
      <View style={{ flex: 1 ,}} />

      {/* RULER COLUMN */}
      <View
        style={styles.rulerArea}
        onLayout={(e: LayoutChangeEvent) => setRulerH(e.nativeEvent.layout.height)}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
          decelerationRate={decelerationRate}
          contentContainerStyle={{
            paddingTop: padTop,
            paddingBottom: padBot,
            // backgroundColor:'red',
        
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

        {/* CENTER HAIRLINE inside the ruler */}
        <View pointerEvents="none" style={[styles.centerOverlay, { top: anchor - LINE_THICKNESS / 2 }]}>
          <View style={styles.centerHairline} />
        </View>
      </View>

      {/* CROSS-LINE (dot + left guide) aligned with the center hairline */}
      {/* <View pointerEvents="none" style={styles.crossline}> */}
      <View pointerEvents="none" style={[styles.crossline, { top: anchor - DOT_SIZE / 2 }]}>
        <View style={[styles.dot, { backgroundColor: accent }]} />
        <View style={styles.crossGuide} />
      </View>

      {/* VALUE ABOVE DOT — centered horizontally on the dot regardless of text width */}
      <View
        pointerEvents="none"
        style={[
          styles.valueOverlay,
          {
            top: anchor,  
            left: DOT_LEFT + DOT_SIZE / 2,
            transform: [
              { translateX: -valW / 2 },
              { translateY: -(DOT_SIZE / 2 + VALUE_GAP) },
            ],
          },
        ]}
        onLayout={(e) => setValW(e.nativeEvent.layout.width)}
      >
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={styles.valueNum}>
            {formatter?.(value, unitLabel)?.replace(/\s*\w+$/, "") ??
              Math.round(value)}
          </Text>
          <Text style={styles.valueUnit}> {unitLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'red',
    flexDirection: "row",
    position: "relative",
  },

  // Ruler on the right side
  rulerArea: { width: RULER_WIDTH, alignSelf: "stretch", position: "relative" },

  tick: { alignSelf: "flex-start", height: 2, backgroundColor: TICK_COLOR, opacity: 0.9 },
  tickLabel: {
    position: "absolute",
    right: 8,
    top: 2,
    fontSize: 12,
    color: LABEL_COLOR,
  },

  // Center hairline
  centerOverlay: {
    position: "absolute",
    right: 0,
    // top: "50%",
    // transform: [{ translateY: -LINE_THICKNESS / 2 }],
    width: RULER_WIDTH,
    zIndex: 3,
  },
  centerHairline: { width: "100%", height: LINE_THICKNESS, backgroundColor: LINE_COLOR },

  // Crossline spanning from left content to ruler
  crossline: {
    position: "absolute",
    left: DOT_LEFT,
    right: RULER_WIDTH - OVERLAP, // overlap into ruler so it looks connected
    // top: "50%",
    // marginTop: -DOT_SIZE / 2,
    height: DOT_SIZE,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
  },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
  crossGuide: { flex: 1, height: LINE_THICKNESS, backgroundColor: LINE_COLOR },

  // Selected value above the dot (inline unit)
  valueOverlay: {
    position: "absolute",
    // top: "50%",
    zIndex: 4,
    alignItems: "center",
  },
  valueNum: {
    fontSize: responsiveFontSize(24),
    fontFamily: fonts.primary.primaryBold,
    color: "#000",
  },
  valueUnit: {
    fontSize: responsiveFontSize(16),
    fontFamily: fonts.primary.primaryMedium,
    color: "#000",
  },
});
