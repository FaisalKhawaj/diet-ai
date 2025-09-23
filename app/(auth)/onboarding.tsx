import {
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Onboarding4,
} from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveLineHeight,
} from "@/utils";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { LabelButton } from "@/components/LabelButton";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { router } from "expo-router";
import { useRef, useState } from "react";
import Swiper from "react-native-swiper";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const slides = [
  {
    title: `AI Powered Recipe Suggestions`,
    description: `Discover recipes tailored to your{"\n"}diet and flavor preferences`,
    image: Onboarding1,
  },
  {
    title: `Scan Food Instantly`,
    description: `Just scan your meal, and we’ll instantly track calories and macros.`,
    image: Onboarding2,
  },
  {
    title: `Track Calories & Macros`,
    description: `Let Diet AI be your smart calorie and macro tracker for better nutrition.`,
    image: Onboarding3,
  },
  {
    title: `Your Personalized Diet Plan`,
    description: `Get a tailored diet plan designed for your diet goals`,
    image: Onboarding4,
  },
];

const FIGMA_IMAGE_WIDTH = 332.6435546875;
const FIGMA_IMAGE_HEIGHT = 685.6198120117188;
const FIGMA_ASPECT_RATIO = FIGMA_IMAGE_WIDTH / FIGMA_IMAGE_HEIGHT;

export default function Onboarding() {
  const swiperRef = useRef<any>(null); // Use any to avoid type error
  const [index, setIndex] = useState(0);

  const handleNext = (index: number) => {
    console.log("handleNext index:", index);
    if (swiperRef.current) {
      if (index < slides.length - 1) {
        swiperRef.current.scrollBy(1);
      } else {
        router.replace("/(auth)/questions");
      }
    }
  };

  const handleContinue = () => {
    if (!swiperRef.current) return;
    if (index < slides.length - 1) {
      // move to next slide
      swiperRef.current.scrollBy(1, true);
    } else {
      // finished
      router.replace("/(auth)/questions");
    }
  };

  return (
    <SafeAreaWrapper edges={["top"]} style={{ paddingHorizontal: 0 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={setIndex}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={{ bottom: responsiveHeight(120) }}
      >
        {slides?.map((swipe, index) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <Image
                source={swipe.image}
                resizeMode="contain"
                style={styles.bigImageStyle}
              />

              <View style={styles.bottomVieWrap}>
                <ThemedText
                  lightColor={Colors.light.heading}
                  darkColor={Colors.dark.heading}
                  style={styles.heading}
                >
                  AI Powered Recipe Suggestions
                </ThemedText>
                <Spacer marginTop={responsiveHeight(11)} />

                <ThemedText
                  lightColor={Colors.light.description}
                  darkColor={Colors.dark.description}
                  style={styles.description}
                >
                  Discover recipes tailored to your{"\n"}diet and flavor
                  preferences
                </ThemedText>
                <Spacer marginTop={responsiveHeight(70)} />
                <LabelButton
                  title="Continue"
                  onPress={handleContinue}
                  // onPress={handleGetStarted}
                  style={{}}
                />
              </View>
            </View>
          );
        })}
      </Swiper>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 31),
    textAlign: "center",
  },
  bigImageStyle: {
    width: SCREEN_WIDTH * 0.89, // match Figma’s relative width
    height: SCREEN_HEIGHT * 0.7,
    aspectRatio: FIGMA_ASPECT_RATIO, //
    alignSelf: "center",
  },
  bottomVieWrap: {
    paddingTop: 40,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    zIndex: 100,
    overflow: "visible",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  description: {
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 25),
    fontFamily: fonts.secondary.secondaryRegular,
    textAlign: "center",
  },
  dot: {
    backgroundColor: Colors.light.primaryButton,
    width: 14,
    height: 14,
    borderRadius: 14,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: Colors.light.activeDot,
    width: 14,
    height: 14,
    borderRadius: 14,
    marginHorizontal: 8,
  },
});
