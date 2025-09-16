import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * Custom hook to disable the hardware back button on Android.
 */
export const useDisableBackButton = () => {
  console.log("useDisableBackButton");
  useEffect(() => {
    const handleBackPress = () => {
      // Prevent the back action
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, []);
};
