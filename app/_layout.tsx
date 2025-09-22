import 'react-native-gesture-handler';
import 'react-native-reanimated';

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
  anchor: "(tabs)",
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

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="personalizing" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="receipe" options={{ headerShown: false }} />
   
        <Stack.Screen name="paywall" options={{ headerShown: false }} />
        <Stack.Screen name="scan-food" options={{ headerShown: false }} />
        <Stack.Screen name="added-food-details" options={{ headerShown: false,

          presentation:'formSheet'
         }}  
        />

<Stack.Screen name="(modals)" options={{ headerShown: false,

presentation:'formSheet'
}}

/>

        <Stack.Screen name="fooddatabase" options={{ headerShown: false,
         }} />
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
