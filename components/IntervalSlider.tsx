import { OneWeek, SixMonths, ThreeMonths } from "@/assets/images";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize } from "@/utils";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ImageSourcePropType,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Spacer } from "./Spacer";

type IntervalId = "1w" | "3m" | "6m";

type Props = {
  value?: IntervalId; // controlled
  defaultValue?: IntervalId; // uncontrolled
  onChange?: (v: IntervalId) => void;

  style?: ViewStyle;
  trackHeight?: number; // default 8
  thumbSize?: number; // default 22
  activeColor?: string; // lime
  trackColor?: string; // grey
  iconOpacityInactive?: number; // 0..1
};

const STOPS: {
  id: IntervalId;
  label: string;
  emoji: string;
  image: ImageSourcePropType;
}[] = [
  { id: "1w", label: "1 week", emoji: "🐆", image: OneWeek }, // fast
  { id: "3m", label: "3 months", emoji: "🐇", image: ThreeMonths }, // medium
  { id: "6m", label: "6 months", emoji: "🐢", image: SixMonths }, // slow
];

export function IntervalSlider({
  value,
  defaultValue = "1w",
  onChange,
  style,
  trackHeight = 8,
  thumbSize = 22,
  activeColor = "#D9FF48",
  trackColor = "#E5E5E5",
  iconOpacityInactive = 0.35,
}: Props) {
  // — layout —
  const [trackW, setTrackW] = useState(0);
  const onTrackLayout = (e: LayoutChangeEvent) =>
    setTrackW(e.nativeEvent.layout.width);

  const indexFromId = (id: IntervalId) => STOPS.findIndex((s) => s.id === id);
  const idFromIndex = (i: number) => STOPS[Math.max(0, Math.min(2, i))].id;

  const isControlled = value != null;
  const [internal, setInternal] = useState<IntervalId>(defaultValue);
  const currentId = (isControlled ? (value as IntervalId) : internal) ?? "1w";
  const currentIndex = indexFromId(currentId);

  // — animation state —
  const xAnim = useRef(new Animated.Value(0)).current;

  const stopXs = useMemo(() => {
    // 3 evenly spaced stops in the track (0, mid, end)
    const gaps = 2;
    return trackW === 0 ? [0, 0, 0] : [0, trackW / gaps, trackW]; // absolute px from left edge
  }, [trackW]);

  // move knob to a stop
  const animateToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(2, i));
    Animated.spring(xAnim, {
      toValue: stopXs[clamped],
      useNativeDriver: false,
      speed: 16,
      bounciness: 7,
    }).start();
  };

  // keep animation in sync when value or layout changes
  useEffect(() => {
    if (trackW === 0) return;
    animateToIndex(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackW, currentIndex]);

  // — gestures —
  const pickNearestIndex = (x: number) => {
    // x is local to the track (0..trackW)
    const ratio = trackW === 0 ? 0 : x / trackW;
    return Math.round(ratio * 2);
  };

  const commitIndex = (i: number) => {
    const id = idFromIndex(i);
    if (!isControlled) setInternal(id);
    onChange?.(id);
    animateToIndex(i);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g: PanResponderGestureState) => {
        const x = Math.max(
          0,
          Math.min(trackW, g.moveX - g.x0 + stopXs[currentIndex])
        );
        xAnim.setValue(x);
      },
      onPanResponderRelease: (_, g) => {
        const startX = stopXs[currentIndex];
        const rawX = startX + g.dx;
        const x = Math.max(0, Math.min(trackW, rawX));
        commitIndex(pickNearestIndex(x));
      },
    })
  ).current;

  // tap anywhere on the track to jump
  const handlePressTrack = (evt: any) => {
    if (!trackW) return;
    const { locationX } = evt.nativeEvent;
    commitIndex(pickNearestIndex(locationX));
  };

  // derived UI
  const thumbLeft = Animated.subtract(xAnim, thumbSize / 2);

  return (
    <View style={[styles.wrap, style]}>
      {/* icons */}
      <View style={styles.rowBetween}>
        {STOPS.map((s, i) => {
          const active = i === currentIndex;
          return (
            <>
              <Image
                contentFit="contain"
                style={{ width: 60, height: 30 }}
                key={`key-${s.id}`}
                source={s.image}
              />
            </>
          );
        })}
      </View>

      <Spacer marginTop={20} />

      {/* track + thumb */}
      <Pressable onPress={handlePressTrack} style={[styles.trackWrap]}>
        <View
          onLayout={onTrackLayout}
          style={[
            styles.track,
            { height: trackHeight, backgroundColor: trackColor },
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: activeColor,
              transform: [{ translateX: thumbLeft }],
            },
          ]}
          {...pan.panHandlers}
        >
          <View
            style={[
              styles.thumbInner,
              {
                width: thumbSize - 8,
                height: thumbSize - 8,
                borderRadius: (thumbSize - 8) / 2,
              },
            ]}
          />
        </Animated.View>
      </Pressable>

      {/* labels */}
      <View style={[styles.rowBetween, { marginTop: 8 }]}>
        {STOPS.map((s) => (
          <Text key={s.id} style={styles.label}>
            {s.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  emoji: { fontSize: 28, color: "#BFBFBF" },

  trackWrap: { marginTop: 8, marginBottom: 4, justifyContent: "center" },
  track: { width: "100%", borderRadius: 999 },

  thumb: {
    position: "absolute",
    top: "50%",
    marginTop: -11, // centers ~22px thumb on the track
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  thumbInner: { backgroundColor: "#FFFFFF" },

  label: {
    color: "#A6A6A6",
    fontSize: responsiveFontSize(18),
    fontFamily: fonts.secondary.secondaryRegular,
  },
});
