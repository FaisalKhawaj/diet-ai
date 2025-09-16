import { Onboarding1, Onboarding2, Onboarding3 } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Image, StyleSheet } from "react-native";

import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const slides = [
  {
    title: `AI Powered Recipe Suggestions`,
    description: `Discover recipes tailored to your{"\n"}diet and flavor preferences`,
    backgroundColor: "#F97316",
    image: Onboarding1,
  },
  {
    title: "Premium Images",
    description: "Unlock unlimited images by a world of global creators.",
    backgroundColor: "#9CA3AF",
    image: Onboarding2,
  },
  {
    title: "Effortless Image Generation",
    description:
      "Simply type a prompt, choose a style, and watch as it brings it to life.",
    backgroundColor: "#3B82F6",
    image: Onboarding3,
  },
];
export default function Onboarding() {
  const swiperRef = useRef<any>(null); // Use any to avoid type error

  const handleNext = (index: number) => {
    if (swiperRef.current) {
      if (index < slides.length - 1) {
        swiperRef.current.scrollBy(1);
      } else {
        // router.replace("/(auth)/camera-access");
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainWrap}>
      <Swiper
        ref={swiperRef}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={{ bottom: 90 }}
      >
        {slides?.map((swipe) => {
          return (
            <>
              <Image
                source={Onboarding1}
                resizeMode="contain"
                style={{ flex: 0.7 }}
              />
              <Spacer marginTop={25} />

              <ThemedText
                lightColor={Colors.light.heading}
                darkColor={Colors.dark.heading}
                style={styles.heading}
              >
                AI Powered Recipe Suggestions
              </ThemedText>
              <Spacer marginTop={11} />

              <ThemedText
                lightColor={Colors.light.description}
                darkColor={Colors.dark.description}
                style={styles.description}
              >
                Discover recipes tailored to your{"\n"}diet and flavor
                preferences
              </ThemedText>
            </>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 31),
    textAlign: "center",
  },
  description: {
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 25),
    fontFamily: fonts.secondary.secondaryRegular,
    textAlign: "center",
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 6,
    height: 6,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 20,
    height: 6,
    borderRadius: 2,
    marginHorizontal: 8,
  },
});
