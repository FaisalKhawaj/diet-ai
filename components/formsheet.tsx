// components/FormSheet.tsx
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  /** Set true to get a centered card (iOS formSheet look). Default is full-width. */
  insetLikeIOS?: boolean;
};

export default function FormSheet({
  children,
  onClose,
  insetLikeIOS = false, // ⬅️ default: full-width
}: Props) {
  const insets = useSafeAreaInsets();

  const ty = useSharedValue(40);
  const backdrop = useSharedValue(0);

  const close = () => onClose?.();

  useEffect(() => {
    ty.value = withSpring(0, { damping: 18, stiffness: 220 });
    backdrop.value = withTiming(1, { duration: 180 });
  }, []);

  const pan = Gesture.Pan()
    .onChange((e) => {
      if (e.translationY > 0) ty.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldClose = e.velocityY > 800 || ty.value > 120;
      if (shouldClose) {
        ty.value = withTiming(600, { duration: 200 }, (finished) => {
          if (finished) runOnJS(close)();
        });
        backdrop.value = withTiming(0, { duration: 160 });
      } else {
        ty.value = withSpring(0, { damping: 18, stiffness: 220 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value * 0.45,
  }));

  const wrapStyle = [
    insetLikeIOS ? styles.insetCard : styles.fullWidth,
    !insetLikeIOS && { paddingBottom: insets.bottom },
    insetLikeIOS && {
      marginTop: insets.top + 8,
      marginBottom: insets.bottom + 8,
    },
  ];

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      {/* Backdrop */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={pan}>
        <Animated.View style={[wrapStyle, sheetStyle]}>
          {/* Grabber */}
          <View style={styles.grabberWrap} pointerEvents="none">
            <View style={styles.grabber} />
          </View>

          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "#000",
  },

  /** FULL-WIDTH: no horizontal spacing, fills screen */
  fullWidth: {
    flex: 1, // <-- important: fills parent
    width: "100%", // <-- edge-to-edge
    alignSelf: "stretch",
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f5f5f5",
    borderRadius: 0,
  },

  /** INSET CARD: enable with insetLikeIOS */
  insetCard: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 540,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    minHeight: "88%",
    height: "100%",
  },

  grabberWrap: {
    alignItems: "center",
    paddingTop: 10,
  },
  grabber: {
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E5E5",
  },
});
