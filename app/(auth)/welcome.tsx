import { WelcomeImg } from "@/assets/images";
import { LabelButton } from "@/components/LabelButton";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const handleGetStarted = () => {
    router.push("/onboarding");
  };
  return (
    <SafeAreaView style={globalStyles.mainWrap}>
      <Image source={WelcomeImg} resizeMode="contain" style={{ flex: 1 }} />

      <ThemedText
        lightColor={Colors.light.heading}
        darkColor={Colors.dark.heading}
        style={styles.heading}
      >
        Calorie Tracking{"\n"}Made Easy
      </ThemedText>
      <Spacer marginTop={10} />
      <ThemedText
        lightColor={Colors.light.description}
        darkColor={Colors.dark.description}
        style={styles.description}
      >
        Lorem ipsum dolor sit amet{"\n"}consectetur. Viverra a nunc tempor.
      </ThemedText>

      <LabelButton
        title="Get Started"
        onPress={handleGetStarted}
        style={{ marginTop: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(35),
    lineHeight: responsiveLineHeight(35, 41),
    fontFamily: fonts.primary.primaryBold,
    textAlign: "center",
  },
  description: {
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 25),
    fontFamily: fonts.secondary.secondaryRegular,
    textAlign: "center",
  },
});
