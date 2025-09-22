import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { RecipeProvider } from "@/context/recipecontext";
import { StepperProvider } from "@/context/stepper";
import { globalStyles } from "@/globalstyles";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useCachedResources from "@/hooks/useCacheResources";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, View } from "react-native";

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
        <Stack.Screen name="receipedetails" options={{ headerShown: false }} />
        <Stack.Screen name="paywall" options={{ headerShown: false }} />
        <Stack.Screen name="fooddatabase" options={{ headerShown: true,
          header:()=>(
            <View style={globalStyles.row}>
            <Pressable style={globalStyles.overflowBackButton} onPress={()=>router.back()}>
              <Ionicons name="chevron-back" size={20} color="#000" />
            </Pressable>
            <ThemedText style={globalStyles.screenCenterHeaderTitle}>Food Database</ThemedText>
          </View>
          )
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
