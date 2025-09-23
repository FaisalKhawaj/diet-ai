import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export const fontAssets = [
  {
    primaryBold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
  },
  {
    primaryRegular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
  },
  {
    primaryMedium: require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
  },
    {
    primaryLight: require("../assets/fonts/BricolageGrotesque-Light.ttf"),
  },
  {
    primarySemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
  },
  {
    secondaryBold: require("../assets/fonts/Inter-Bold.otf"),
  },
  {
    secondaryMedium: require("../assets/fonts/Inter-Medium.otf"),
  },
  {
    secondaryRegular: require("../assets/fonts/Inter-Regular.otf"),
  },
  {
    secondarySemiBold: require("../assets/fonts/Inter-SemiBold.otf"),
  },
].map((x: any) => Font.loadAsync(x));

export const fonts = {
  primary: {
    primaryBold: "primaryBold",
    primaryMedium: "primaryMedium",
    primaryLight:"primaryLight",
    primaryRegular:"primaryRegular",
    primarySemiBold: "primarySemiBold",
  },
  secondary: {
    secondaryBold: "secondaryBold",
    secondaryMedium: "secondaryMedium",
    secondaryRegular: "secondaryRegular",
    secondarySemiBold: "secondarySemiBold",
  },
};

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();
      // Load fonts

      // await Font.loadAsync(fontAssets);
      await Promise.all([...fontAssets]);
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      //  setTimeout(SplashScreen.hideAsync, 10000);
      SplashScreen.hideAsync();
    }
  }
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, setLoadingComplete };
}
