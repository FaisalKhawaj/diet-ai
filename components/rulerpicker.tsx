// import {
//   AnimatedFlashList,
//   ListRenderItem
// } from "@shopify/flash-list";
// import React, { useCallback, useEffect, useRef } from "react";
// import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// import {
//   Animated,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// import { calculateCurrentValue } from "@/utils/calculations";
// import { RulerPickerItem, RulerPickerItemProps } from "./rulerpickeritem";

// const { width: windowWidth } = Dimensions.get("window");

// export type RulerPickerTextProps = Pick<
//   React.ComponentProps<typeof Text>["style"],
//   // minimal text subset
//   "color" | "fontSize" | "fontWeight"
// >;

// export type RulerPickerProps = {
//   width?: number;
//   height?: number;

//   min: number;
//   max: number;
//   step?: number;

//   initialValue?: number;
//   fractionDigits?: number;

//   unit?: string;

//   indicatorHeight?: number;
//   indicatorColor?: string;

//   valueTextStyle?: any;
//   unitTextStyle?: any;
//   majorEverySteps?: number;  // how many indices between "long" ticks
//   midEverySteps?: number; 

//   decelerationRate?: "fast" | "normal" | number;

//   onValueChange?: (value: string) => void;
//   onValueChangeEnd?: (value: string) => void;
// } & Partial<RulerPickerItemProps>;

// export const RulerPicker = ({
//   width = windowWidth,
//   height = 120,
//   min,
//   max,
//   step = 1,
//   initialValue = min,
//   fractionDigits = 0,
//   unit = "cm",

//   indicatorHeight = 80,
//   indicatorColor = "black",

//   gapBetweenSteps = 10,
//   shortStepHeight = 20,
//   longStepHeight = 40,
//   stepWidth = 2,
//   shortStepColor = "lightgray",
//   longStepColor = "darkgray",

//   valueTextStyle,
//   unitTextStyle,

//   decelerationRate = "normal",
//   onValueChange,
//   onValueChangeEnd,
//     /** ✅ receive cadence props */
//     majorEverySteps = 10,
//     midEverySteps = 5,

// }: RulerPickerProps) => {
//   // number of ticks
//   const itemAmount = Math.round((max - min) / step);
//   const arrData = Array.from({ length: itemAmount + 1 }, (_, i) => i);

//   const listRef = useRef<any>(null);
//   const stepTextRef = useRef<TextInput>(null);

//   const prevValue = useRef<string>(initialValue.toFixed(fractionDigits));
//   const prevMomentumValue = useRef<string>(prevValue.current);

//   // animated value for horizontal scroll
//   const scrollPosition = useRef(new Animated.Value(0)).current;

//   // value update while scrolling
//   const valueCallback: Animated.ValueListenerCallback = useCallback(
//     ({ value }) => {
//       const newStep = calculateCurrentValue(
//         value,
//         stepWidth,
//         gapBetweenSteps,
//         min,
//         max,
//         step,
//         fractionDigits
//       );
//       if (prevValue.current !== newStep) {
//         onValueChange?.(newStep);
//         stepTextRef.current?.setNativeProps({ text: newStep });
//         prevValue.current = newStep;
//       }
//     },
//     [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step]
//   );

//   useEffect(() => {
//     scrollPosition.addListener(valueCallback);
//     return () => scrollPosition.removeAllListeners();
//   }, [scrollPosition, valueCallback]);

//   // wire native event → Animated.Value
//   const scrollHandler = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollPosition } } }],
//     { useNativeDriver: true }
//   );

//   // header/footer so the center indicator lines up
//   const renderSeparator = useCallback(
//     () => <View style={{ width: width * 0.5 - stepWidth * 0.5 }} />,
//     [width, stepWidth]
//   );

//   const renderItem: ListRenderItem<number> = useCallback(
//     ({ index }) => (
//       <RulerPickerItem
//         isLast={index === arrData.length - 1}
//         index={index}
//         stepWidth={stepWidth}
//         shortStepHeight={shortStepHeight}
//         longStepHeight={longStepHeight}
//         shortStepColor={shortStepColor}
//         longStepColor={longStepColor}
//         gapBetweenSteps={gapBetweenSteps}
//         majorEverySteps={majorEverySteps ?? 10}
//         midEverySteps={midEverySteps ?? 5}
        
//       />
//     ),
//     [
//       arrData.length,
//       shortStepHeight,
//       longStepHeight,
//       gapBetweenSteps,
//       stepWidth,
//       shortStepColor,
//       longStepColor,
//       majorEverySteps,
//       midEverySteps

//     ]
//   );

//   const onMomentumScrollEnd = useCallback(
//     (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const x = e.nativeEvent.contentOffset.x;
//       const newStep = calculateCurrentValue(
//         x,
//         stepWidth,
//         gapBetweenSteps,
//         min,
//         max,
//         step,
//         fractionDigits
//       );

//       // snap to the nearest tick precisely
//       const spacing = stepWidth + gapBetweenSteps;
//       const index = Math.round(x / spacing);
//       listRef.current?.scrollToOffset({
//         offset: index * spacing,
//         animated: true,
//       });

//       if (prevMomentumValue.current !== newStep) {
//         onValueChangeEnd?.(newStep);
//         prevMomentumValue.current = newStep;
//       }
//     },
//     [
//       gapBetweenSteps,
//       fractionDigits,
//       max,
//       min,
//       onValueChangeEnd,
//       step,
//       stepWidth,
//     ]
//   );

//   // initial position so initialValue sits under the center indicator
//   const onContentSizeChange = () => {
//     const initialIndex = Math.round((initialValue - min) / step);
//     const spacing = stepWidth + gapBetweenSteps;
//     listRef.current?.scrollToOffset({
//       offset: initialIndex * spacing,
//       animated: false,
//     });
//   };

//   const snapOffsets = arrData.map((_, i) => i * (stepWidth + gapBetweenSteps));

//   return (
//     <View style={{ width, height }}>
//       <AnimatedFlashList
//         ref={listRef}
//         horizontal
//         data={arrData}
//         keyExtractor={(v) => String(v)}
//         renderItem={renderItem}
//         ListHeaderComponent={renderSeparator}
//         ListFooterComponent={renderSeparator}
//         onScroll={scrollHandler}
//         onMomentumScrollEnd={onMomentumScrollEnd}
//         snapToAlignment="start"
//         snapToOffsets={snapOffsets}
//         onContentSizeChange={onContentSizeChange}
//         decelerationRate={decelerationRate}
//         scrollEventThrottle={16}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* center indicator + live value */}
//       <View
//         pointerEvents="none"
//         style={[
//           styles.indicator,
//           {
//             transform: [
//               { translateX: -stepWidth * 0.5 },
//               {
//                 translateY:
//                   -indicatorHeight * 0.5 -
//                   (valueTextStyle?.fontSize ?? styles.valueText.fontSize),
//               },
//             ],
//             left: stepWidth * 0.5, // centers the thin line
//           },
//         ]}
//       >
//         {/* value + unit above the line */}
//         <View
//           style={[
//             styles.displayTextContainer,
//             {
//               height: valueTextStyle?.fontSize ?? styles.valueText.fontSize,
//               transform: [
//                 {
//                   translateY:
//                     -(valueTextStyle?.fontSize ?? styles.valueText.fontSize) *
//                     0.5,
//                 },
//               ],
//             },
//           ]}
//         >
//           <TextInput
//             ref={stepTextRef}
//             defaultValue={initialValue.toFixed(fractionDigits)}
//             editable={false}
//             style={[
//               { lineHeight: valueTextStyle?.fontSize ?? styles.valueText.fontSize },
//               styles.valueText,
//               valueTextStyle,
//             ]}
//           />
//           {!!unit && (
//             <Text
//               style={[
//                 { lineHeight: unitTextStyle?.fontSize ?? styles.unitText.fontSize },
//                 styles.unitText,
//                 unitTextStyle,
//               ]}
//             >
//               {unit}
//             </Text>
//           )}
//         </View>

//         {/* the center line */}
//         <View
//           style={{
//             width: stepWidth,
//             height: indicatorHeight,
//             backgroundColor: indicatorColor,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   indicator: {
//     position: "absolute",
//     top: "50%",
//     width: "100%",
//     alignItems: "center",
//   },
//   displayTextContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   valueText: {
//     color: "black",
//     fontSize: 28,
//     fontWeight: "800",
//     margin: 0,
//     padding: 0,
//   },
//   unitText: {
//     color: "black",
//     fontSize: 20,
//     fontWeight: "400",
//     marginLeft: 6,
//   },
// });

import {
  AnimatedFlashList,
  ListRenderItem
} from "@shopify/flash-list";
import React, { useCallback, useEffect, useRef } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { calculateCurrentValue } from "@/utils/calculations";
import { RulerPickerItem, RulerPickerItemProps } from "./rulerpickeritem";

const { width: windowWidth } = Dimensions.get("window");

export type RulerPickerProps = {
  width?: number;
  height?: number;
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  fractionDigits?: number;
  unit?: string;

  indicatorHeight?: number;
  indicatorColor?: string;

  valueTextStyle?: any;
  unitTextStyle?: any;

  /** cadence for tick lengths */
  majorEverySteps?: number;
  midEverySteps?: number;

  decelerationRate?: "fast" | "normal" | number;

  onValueChange?: (value: string) => void;
  onValueChangeEnd?: (value: string) => void;
} & Partial<RulerPickerItemProps>;

export const RulerPicker = ({
  width = windowWidth,
  height = 120,
  min,
  max,
  step = 1,
  initialValue = min,
  fractionDigits = 0,
  unit = "cm",

  indicatorHeight = 80,
  indicatorColor = "black",

  gapBetweenSteps = 10,
  shortStepHeight = 20,
  longStepHeight = 40,
  stepWidth = 2,
  shortStepColor = "lightgray",
  longStepColor = "darkgray",

  valueTextStyle,
  unitTextStyle,

  /** ✅ receive cadence props */
  majorEverySteps = 10,
  midEverySteps = 5,

  decelerationRate = "normal",
  onValueChange,
  onValueChangeEnd,
}: RulerPickerProps) => {
  const itemAmount = Math.round((max - min) / step);
  const arrData = Array.from({ length: itemAmount + 1 }, (_, i) => i);

  const listRef = useRef<any>(null);
  const stepTextRef = useRef<TextInput>(null);

  const prevValue = useRef<string>(initialValue.toFixed(fractionDigits));
  const prevMomentumValue = useRef<string>(prevValue.current);

  const scrollPosition = useRef(new Animated.Value(0)).current;

  const valueCallback: Animated.ValueListenerCallback = useCallback(
    ({ value }) => {
      const newStep = calculateCurrentValue(
        value,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits
      );
      if (prevValue.current !== newStep) {
        onValueChange?.(newStep);
        stepTextRef.current?.setNativeProps({ text: newStep });
        prevValue.current = newStep;
      }
    },
    [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step]
  );

  useEffect(() => {
    scrollPosition.addListener(valueCallback);
    return () => scrollPosition.removeAllListeners();
  }, [scrollPosition, valueCallback]);

  const scrollHandler = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollPosition } } }],
    { useNativeDriver: true }
  );

  const renderSeparator = useCallback(
    () => <View style={{ width: width * 0.5 - stepWidth * 0.5 }} />,
    [width, stepWidth]
  );

  const renderItem: ListRenderItem<number> = useCallback(
    ({ index }) => (
      <RulerPickerItem
        isLast={index === arrData.length - 1}
        index={index}
        gapBetweenSteps={gapBetweenSteps}
        shortStepHeight={shortStepHeight}
        longStepHeight={longStepHeight}
        stepWidth={stepWidth}
        shortStepColor={shortStepColor}
        longStepColor={longStepColor}
        /** ✅ forward cadence */
        majorEverySteps={majorEverySteps}
        midEverySteps={midEverySteps}
      />
    ),
    [
      arrData.length,
      gapBetweenSteps,
      shortStepHeight,
      longStepHeight,
      stepWidth,
      shortStepColor,
      longStepColor,
      majorEverySteps,
      midEverySteps,
    ]
  );

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const newStep = calculateCurrentValue(
        x,
        stepWidth,
        gapBetweenSteps,
        min,
        max,
        step,
        fractionDigits
      );

      const spacing = stepWidth + gapBetweenSteps;
      const index = Math.round(x / spacing);
      listRef.current?.scrollToOffset({ offset: index * spacing, animated: true });

      if (prevMomentumValue.current !== newStep) {
        onValueChangeEnd?.(newStep);
        prevMomentumValue.current = newStep;
      }
    },
    [gapBetweenSteps, fractionDigits, max, min, onValueChangeEnd, step, stepWidth]
  );

  const onContentSizeChange = () => {
    const spacing = stepWidth + gapBetweenSteps;
    const unclamped = Math.round((initialValue - min) / step);
    const initialIndex = Math.max(0, Math.min(unclamped, arrData.length - 1));
    listRef.current?.scrollToOffset({ offset: initialIndex * spacing, animated: false });
  };

  const snapOffsets = arrData.map((_, i) => i * (stepWidth + gapBetweenSteps));

  return (
    <View style={{ width, height }}>
      <AnimatedFlashList
        ref={listRef}
        horizontal
        data={arrData}
        keyExtractor={(v) => String(v)}
        renderItem={renderItem}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        snapToAlignment="start"
        snapToOffsets={snapOffsets}
        onContentSizeChange={onContentSizeChange}
        decelerationRate={decelerationRate}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

      {/* center indicator + live value */}
      <View
        pointerEvents="none"
        style={[
          styles.indicator,
          {
            transform: [
              { translateX: -stepWidth * 0.5 },
              {
                translateY:
                  -indicatorHeight * 0.5 -
                  (valueTextStyle?.fontSize ?? styles.valueText.fontSize),
              },
            ],
            left: stepWidth * 0.5,
          },
        ]}
      >
        <View
          style={[
            styles.displayTextContainer,
            {
              height: valueTextStyle?.fontSize ?? styles.valueText.fontSize,
              transform: [
                { translateY: -(valueTextStyle?.fontSize ?? styles.valueText.fontSize) * 0.5 },
              ],
            },
          ]}
        >
          <TextInput
            ref={stepTextRef}
            defaultValue={initialValue.toFixed(fractionDigits)}
            editable={false}
            style={[
              { lineHeight: valueTextStyle?.fontSize ?? styles.valueText.fontSize },
              styles.valueText,
              valueTextStyle,
            ]}
          />
          {!!unit && (
            <Text
              style={[
                { lineHeight: unitTextStyle?.fontSize ?? styles.unitText.fontSize },
                styles.unitText,
                unitTextStyle,
              ]}
            >
              {unit}
            </Text>
          )}
        </View>
        <View style={{ width: stepWidth, height: indicatorHeight, backgroundColor: indicatorColor }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: { position: "absolute", top: "50%", width: "100%", alignItems: "center" },
  displayTextContainer: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
  valueText: { color: "black", fontSize: 28, fontWeight: "800", margin: 0, padding: 0 },
  unitText: { color: "black", fontSize: 20, fontWeight: "400", marginLeft: 6 },
});
