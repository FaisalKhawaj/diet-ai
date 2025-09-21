import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { RecipeProvider } from "@/context/recipecontext";
import { StepperProvider } from "@/context/stepper";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useCachedResources from "@/hooks/useCacheResources";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoadingComplete } = useCachedResources();

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <StepperProvider initialTotal={1}>  
            <RecipeProvider>

       
      <Stack>

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="personalizing" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="receipe" options={{ headerShown: false }} />
        <Stack.Screen name="receipedetails" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      </RecipeProvider>
      </StepperProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
