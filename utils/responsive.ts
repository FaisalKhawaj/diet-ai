// utils/responsive.ts

import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;

// You can adjust the guideline base width and height based on your Figma frame
const guidelineBaseWidth = 393; // iPhone 11 width

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

export const isTablet = () => {
  // You can tweak the threshold depending on design needs
  return Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600 || aspectRatio < 1.6;
};

// const verticalScale = (size: number) =>
//   (SCREEN_HEIGHT / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const round = (value: number) =>
  Math.round(PixelRatio.roundToNearestPixel(value));

// New safe clamp function
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// Unified responsive scale
const responsiveModerateScale = (
  size: number,
  factor = 0.5,
  maxScale = 1.2,
) => {
  const scaled = moderateScale(size, factor);
  const clamped = clamp(scaled, size * 0.9, size * maxScale);
  return round(clamped);
};

/**
 * Responsive width based on Figma
 */
export const responsiveWidth = (size: number, factor = 0.5) => {
  return responsiveModerateScale(size, factor, isTablet() ? 1.15 : 1.2);
};

/**
 * Responsive height based on Figma
 */
export const responsiveHeight = (size: number, factor = 0.5) => {
  return responsiveModerateScale(size, factor, isTablet() ? 1.1 : 1.2);
};

/**
 * @param size - font size from Figma
 * @param factor - optional factor to control scale strength (default 0.5)
 * @returns responsive font size
 */
export const responsiveFontSize = (size: number, factor = 0.5): number => {
  const baseScaledFontSize = moderateScale(size, factor);
  if (isTablet()) {
    // Apply a stricter scaling for tablets
    const tabletScaleFactor = 0.8; // Reduce scaling factor for tablets
    const maxTabletScale = 1.1; // Restrict max scale for tablets
    const clampedSize = clamp(
      baseScaledFontSize * tabletScaleFactor,
      size * 0.9,
      size * maxTabletScale,
    );
    return round(clampedSize);
  }
  // Regular scaling for phones
  const maxPhoneScale = 1.2;
  const clampedSize = clamp(
    baseScaledFontSize,
    size * 0.9,
    size * maxPhoneScale,
  );
  return round(clampedSize);
  // return Math.round(
  //   PixelRatio.roundToNearestPixel(moderateScale(size, factor)),
  // );
};

// export const responsiveFontSize = (size: number, factor = 0.5) => {
// return Math.round(
//   PixelRatio.roundToNearestPixel(moderateScale(size, factor)),
// );
// };

// export const responsiveLineHeight = (  originalFontSize: number,
// originalLineHeight: number,
// factor = 0.5,) => {
// const scaledFontSize = moderateScale(originalFontSize, factor);
// const lineHeightRatio = originalLineHeight / originalFontSize;
// const scaledLineHeight = scaledFontSize * lineHeightRatio;
// return round(scaledLineHeight);
// };

export const responsiveLineHeight = (
  originalFontSize: number,
  originalLineHeight: number,
  factor = 0.5,
) => {
  // Get the responsive font size using the same logic as responsiveFontSize
  const scaledFontSize = responsiveFontSize(originalFontSize, factor);

  // Maintain the line height ratio
  const lineHeightRatio = originalLineHeight / originalFontSize;
  const scaledLineHeight = scaledFontSize * lineHeightRatio;
  // Round the scaled line height to the nearest pixel
  return round(scaledLineHeight);
  // const scaledFontSize = moderateScale(originalFontSize, factor);
  // const lineHeightRatio = originalLineHeight / originalFontSize;
  // const scaledLineHeight = scaledFontSize * lineHeightRatio;

  // return round(scaledLineHeight);
};
