/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View } from "react-native";

export type RulerPickerItemProps = {
  gapBetweenSteps: number;
  shortStepHeight: number;
  longStepHeight: number;
  stepWidth: number;
  shortStepColor: string;
  longStepColor: string;
  majorEverySteps: number;  // NEW
  midEverySteps: number;  
};

type Props = {
  index: number;
  isLast: boolean;
} & RulerPickerItemProps;

export const RulerPickerItem = React.memo(
  ({
    isLast,
    index,
    gapBetweenSteps,
    shortStepHeight,
    longStepHeight,
    stepWidth,
    shortStepColor,
    longStepColor,
    majorEverySteps, midEverySteps,
  }: Props) => {
     // ✅ derive tick type from cadence props
     const isMajor = index % majorEverySteps === 0;
     const isMid = !isMajor && index % midEverySteps === 0;
    const isLong = index % 10 === 0; // every 10th mark is a long tick

    const midStepHeight = Math.round((shortStepHeight + longStepHeight) / 2);
    const height = isMajor ? longStepHeight : isMid ? midStepHeight : shortStepHeight;

    // const height = isLong ? longStepHeight : shortStepHeight;

    return (
      <View
        style={{
          width: stepWidth,
          height: "100%",
          justifyContent: "center",
          marginRight: isLast ? 0 : gapBetweenSteps,
          marginTop: shortStepHeight,
        }}
      >
        <View
          style={{
            width: "100%",
            height,
            backgroundColor: isMajor ? longStepColor : shortStepColor,

            // backgroundColor: isLong ? longStepColor : shortStepColor,
            marginTop: isMajor ? 0 : shortStepHeight,

            // marginTop: isLong ? 0 : shortStepHeight,
          }}
        />
      </View>
    );
  }
);
