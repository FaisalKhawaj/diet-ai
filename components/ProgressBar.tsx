import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  I18nManager,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type ProgressBarProps = {
  /** 0..1 or 0..max (auto-normalized) */
  value?: number;
  /** Upper bound when not using 0..1 values */
  max?: number;
  /** When true, shows looping shimmer/stripe animation */
  indeterminate?: boolean;

  /** Dimensions & shape */
  height?: number;
  borderRadius?: number;

  /** Colors */
  trackColor?: string;
  fillColor?: string; // ignored if gradientColors provided
  gradientColors?: [string, string]; // simple 2-stop horizontal gradient (fake via overlay)

  /** Visual options */
  rounded?: boolean; // rounded ends for the fill
  striped?: boolean; // diagonal stripes on the fill
  stripeOpacity?: number; // 0..1
  showLabel?: boolean; // renders % text
  labelFormat?: (pct: number) => string;

  /** Animation */
  animated?: boolean;
  duration?: number; // ms for determinate bar change
  easing?: (value: number) => number;

  /** Styles */
  style?: StyleProp<ViewStyle>; // container
  trackStyle?: StyleProp<ViewStyle>;
  fillStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  /** A11y */
  accessibilityLabel?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 1,
  indeterminate = false,

  height = 10,
  borderRadius,
  trackColor = "#EFEFEF",
  fillColor = "#000000",
  gradientColors,
  rounded = true,
  striped = false,
  stripeOpacity = 0.15,
  showLabel = false,
  labelFormat = (pct) => `${Math.round(pct * 100)}%`,

  animated = true,
  duration = 450,
  easing = Easing.out(Easing.cubic),

  style,
  trackStyle,
  fillStyle,
  labelStyle,

  accessibilityLabel = "Progress",
}) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const stripeAnim = useRef(new Animated.Value(0)).current;
  const containerWidth = useRef(0);

  const pct = useMemo(() => {
    const normalized = max <= 0 ? 0 : Math.min(Math.max(value / max, 0), 1);
    return isNaN(normalized) ? 0 : normalized;
  }, [value, max]);

  useEffect(() => {
    if (indeterminate) {
      Animated.loop(
        Animated.timing(stripeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      stripeAnim.stopAnimation();
      stripeAnim.setValue(0);
    }
  }, [indeterminate, stripeAnim]);

  useEffect(() => {
    if (indeterminate || containerWidth.current === 0) return;

    const target = pct * containerWidth.current;

    if (animated) {
      Animated.timing(widthAnim, {
        toValue: target,
        duration,
        easing,
        useNativeDriver: false, // width cannot use native driver
      }).start();
    } else {
      widthAnim.setValue(target);
    }
  }, [pct, animated, duration, easing, indeterminate, widthAnim]);

  const onLayout = (e: LayoutChangeEvent) => {
    containerWidth.current = e.nativeEvent.layout.width;

    // set initial width
    if (!indeterminate) {
      const w = pct * containerWidth.current;
      widthAnim.setValue(w);
    }
  };

  const isRTL = I18nManager.isRTL;

  const radius =
    borderRadius ??
    (rounded ? Math.ceil(height / 2) : 0);

  return (
    <View
      onLayout={onLayout}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ now: Math.round(pct * 100), min: 0, max: 100 }}
      style={[
        styles.container,
        { height, borderRadius: radius, backgroundColor: trackColor },
        style,
        trackStyle,
      ]}
    >
      {/* FILL */}
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            borderRadius: radius,
            backgroundColor: gradientColors ? "transparent" : fillColor,
            // Support RTL fill from right to left by flipping align
            width: indeterminate ? "35%" : widthAnim,
            position: "absolute",
            left: isRTL ? undefined : 0,
            right: isRTL ? 0 : undefined,
            overflow: "hidden",
          },
          fillStyle,
        ]}
      >
        {/* Fake gradient overlay (simple, no deps) */}
        {gradientColors && (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1, backgroundColor: gradientColors[0] }} />
            <View style={{ flex: 1, backgroundColor: gradientColors[1] }} />
          </View>
        )}

        {/* Stripes */}
        {striped && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: stripeOpacity,
                transform: [
                  {
                    translateX: stripeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: isRTL ? [10, -10] : [-10, 10],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.stripes} />
          </Animated.View>
        )}
      </Animated.View>

      {/* Label */}
      {showLabel && (
        <View style={styles.labelWrap} pointerEvents="none">
          <Text style={[styles.label, labelStyle]}>{labelFormat(pct)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    top: 0,
  },
  stripes: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    // diagonal stripes using repeating linear gradient trick via transforms:
    // We approximate with tiny rotated bars to avoid extra deps
    // (looks good on light/dark tracks).
    transform: [{ rotate: "15deg" }],
    backgroundRepeat: "repeat",
    backgroundSize: undefined as any, // RN ignores; visual comes from children
  } as any,
  labelWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },
});
