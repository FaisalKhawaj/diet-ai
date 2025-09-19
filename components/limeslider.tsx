import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type LimeSliderProps = {
  value: number;
  onChange?: (v: number) => void;
  onChangeEnd?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Outer wrapper style (controls width/margins) */
  style?: StyleProp<ViewStyle>;
  /** Visual tuning */
  sliderHeight?: number;   // track height
  thumbSize?: number;      // diameter of the thumb
  minTrackColor?: string;  // left (filled) color
  maxTrackColor?: string;  // right (unfilled) color
  ringColor?: string;      // lime ring
  thumbInnerColor?: string;// inner circle color
  disabled?: boolean;
};

export const LimeSlider: React.FC<LimeSliderProps> = ({
  value,
  onChange,
  onChangeEnd,
  min = 0,
  max = 100,
  step = 1,
  style,
  sliderHeight = 8,
  thumbSize = 22,
  minTrackColor = "#D6FF5F", // neon-lime
  maxTrackColor = "#EFEFEF",
  ringColor = "#D6FF5F",
  thumbInnerColor = "#FFFFFF",
  disabled = false,
}) => {
  const [length, setLength] = useState(0);
  const radius = Math.round(sliderHeight / 2);

  return (
    <View
      style={style}
      onLayout={(e) => setLength(e.nativeEvent.layout.width)}
    >
      {length > 0 && (
        <MultiSlider
          enabledOne={!disabled}
          values={[value]}
          min={min}
          max={max}
          step={step}
          sliderLength={length}
          allowOverlap={false}
          snapped
          onValuesChange={(vals) => onChange?.(vals[0])}
          onValuesChangeFinish={(vals) => onChangeEnd?.(vals[0])}
          // Track
          trackStyle={{
            height: sliderHeight,
            borderRadius: radius,
            backgroundColor: maxTrackColor,
          }}
          selectedStyle={{
            height: sliderHeight,
            borderRadius: radius,
            backgroundColor: minTrackColor,
          }}
          unselectedStyle={{
            height: sliderHeight,
            borderRadius: radius,
            backgroundColor: maxTrackColor,
          }}
          // Thumb (custom marker for the lime ring + white center)
          customMarker={() => (
            <View
              style={{
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                borderWidth: 3,
                borderColor: ringColor,
                backgroundColor: thumbInnerColor,
                // subtle glow
                shadowColor: ringColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 6,
                elevation: 4,
              }}
            />
          )}
          // vertically center the thumb on the track
          markerOffsetY={thumbSize / 2 - sliderHeight / 2}
        />
      )}
    </View>
  );
};
