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
import { responsiveFontSize, responsiveHeight, responsiveLineHeight, responsiveWidth } from "@/utils";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { LabelButton } from "@/components/LabelButton";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { router } from "expo-router";
import { useRef } from "react";
import Swiper from "react-native-swiper";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

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

  const handleNext = (index: number) => {
    if (swiperRef.current) {
      if (index < slides.length - 1) {
        swiperRef.current.scrollBy(1);
      } else {
        router.replace("/(auth)/questions");
      }
    }
  };

  return (
    <SafeAreaWrapper >
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={handleNext}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={{ bottom: 40 }}
      >
        {slides?.map((swipe) => {
          return (
            <View style={{
              flex:1,
              position:'relative'
            }}>
              <View style={{flex:0.8,alignItems:'center'}}>
              <Image
                source={swipe.image}
                resizeMode="cover"
                
                style={{ height:'100%',
                  width: SCREEN_WIDTH * 0.89, // scale relative to screen width
    aspectRatio: FIGMA_ASPECT_RATIO, //
              //  aspectRatio:0.2
                   }}
              />
              </View>
            
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
            </View>
          );
        })}
      </Swiper>

      <LabelButton
        title="Continue"
        // onPress={handleGetStarted}
        style={{ marginTop: 24 }}
      />
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
  figmaImage:{
    position:'absolute',
    width:responsiveWidth(332.64),
    height:responsiveHeight(685.619812),
    left:48.68,
    top:56.2,
    opacity:1,
    transform:[{rotate:'0deg'}]
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
