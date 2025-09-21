import { Colors } from "@/constants/theme";
import { globalStyles } from "@/globalstyles";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ProgressBar } from "./ProgressBar"; // use the generic ProgressBar we made
import { Spacer } from "./Spacer";
import { ThemedText } from "./themed-text";

type QuestionStepProps = {
  /** Title shown in bold */
  title?: string;
  /** Optional subtitle shown under title */
  description?: string;

  /** Progress: current step (1-based) and total steps */
  step: number;
  totalSteps: number;

  /** Main content (radios, slider, etc.) */
  children: React.ReactNode;

  /** Called when continue is pressed */
  onContinue: () => void;
  /** Called when back is pressed */
  onBack?: () => void;

  /** Optional style overrides */
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  continueText?: string;
  renderTitle?:any,
};

export const ReceipeStep: React.FC<QuestionStepProps> = ({
  title,
  description,
  step,
  totalSteps,
  children,
  onContinue,
  onBack,
  containerStyle,
  titleStyle,
  descriptionStyle,
  continueText = "Continue",
}) => {
  const progress = step / totalSteps;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header */}
      <View style={globalStyles.row}>
        <Pressable style={globalStyles.overflowBackButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={20} color="#000" />
        </Pressable>
        <ThemedText style={globalStyles.screenCenterHeaderTitle}>Receipe AI</ThemedText>
      </View>

      <Spacer marginTop={30} />
      <View style={styles.header}>
        <View style={styles.progressWrap}>
          <ProgressBar value={progress} />
        </View>
      </View>

      {/* Title & Description */}
      <Spacer marginTop={10} />
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <Spacer marginTop={10} />
      {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}

      {/* Flexible content area */}
      <View style={styles.contentWrapper}>
        <View style={styles.content}>{children}</View>

        {/* Continue button pinned to bottom */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
            <Text style={styles.continueText}>{continueText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row', alignItems: 'center'
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between", // pushes footer to bottom
  },
  screenCenterHeaderTitle: {
    flex: 1,
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 30)
    , textAlign: 'center'
  },
  progressWrap: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  textWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: responsiveFontSize(34),
    lineHeight: responsiveLineHeight(34, 40),
    fontFamily: fonts.primary.primaryBold,
    color: "#000",
    textAlign: "center",
  },
  description: {
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 24),
    fontFamily: fonts.secondary.secondaryRegular,
    paddingHorizontal: 20,
    color: "#7A7A7A",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingTop: 25,
    // justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  continueBtn: {
    backgroundColor: Colors.light.primaryButton, // lime-like color
    borderRadius: 30,
    paddingVertical: 16,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",

  },
  continueText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 24),
    color: "#000",
  },
});
