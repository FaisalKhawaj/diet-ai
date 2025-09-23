import { Carrot, Lock } from "@/assets/images";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { ThemedText } from "@/components/themed-text";
import { useRecipe } from "@/context/recipecontext";
import { useStepper } from "@/context/stepper";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const SIZE = 220;
const STROKE = 16;
const ACCENT = "#D9FF48";
const BASE = "#F1F1F1";

function SpinningArc() {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const r = (SIZE - STROKE) / 2;
  const c = 2 * Math.PI * r;
  const segment = c * 0.36;
  const remainder = c - segment;

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={r}
          stroke={BASE}
          strokeWidth={STROKE}
          fill="none"
        />
      </Svg>

      <Animated.View
        style={[StyleSheet.absoluteFill, { transform: [{ rotate: spin }] }]}
      >
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            stroke={ACCENT}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${segment}, ${remainder}`}
            fill="none"
          />
        </Svg>
      </Animated.View>

      <View style={styles.carrotWrap}>
        <Image
          source={Carrot}
          contentFit="contain"
          style={{ width: 71, height: 71 }}
        />
      </View>
    </View>
  );
}

export default function Personalizing() {
  const { type } = useStepper();
  const { setShowRecipeAI, setShowAddRecipe } = useRecipe();
  console.log("Personalizing type", type);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (type === "question") {
        router.push("/results");
      } else {
        router.push('/(tabs)')
        setShowRecipeAI(true);
      }
      // <-- replace with your actual next screen path
    }, 10000); // 20 seconds

    setShowAddRecipe(false);
    return () => clearTimeout(timer); // cleanup when unmounting
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={styles.root}>
        <View style={styles.ringRow}>
          <SpinningArc />
        </View>

        <ThemedText style={styles.title}>
          {type === "question" ? `Personalizing…` : `Generating...`}
        </ThemedText>

        <View style={styles.bottom}>
          <View style={styles.lockBadge}>
            <Image source={Lock} style={{ width: 30, height: 30 }} />
          </View>
          <Text style={styles.disclaimer}>
            Your Data is secure and is private and will never get shared. This
            will be only used to calculate macros and planning your diet.
          </Text>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  ringRow: {
    marginTop: 80,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(40),
    lineHeight: responsiveLineHeight(40, 50),
    fontFamily: fonts.primary.primaryBold,
    marginTop: 24,
    color: "#0B0B0B",
  },
  carrotWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  lockBadge: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  disclaimer: {
    textAlign: "center",
    fontFamily: fonts.secondary.secondaryMedium,
    color: "#696767",
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 19),
  },
});
