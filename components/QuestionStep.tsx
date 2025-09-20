import { Colors } from "@/constants/theme";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ProgressBar } from "./ProgressBar"; // use the generic ProgressBar we made
import { Spacer } from "./Spacer";

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

export const QuestionStep: React.FC<QuestionStepProps> = ({
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
  renderTitle
}) => {
  const progress = step / totalSteps;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header Row: Back Button + Progress */}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Ionicons name="chevron-back" size={20} color="#000" />
      </TouchableOpacity>
      <Spacer marginTop={30} />
      <View style={styles.header}>
        <View style={styles.progressWrap}>
          <ProgressBar value={progress} />
        </View>
      </View>
      <Spacer marginTop={10} />
      {/* Title & Description */}

      {title &&
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      }
      {renderTitle&&renderTitle()}

      <Spacer marginTop={10} />
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}


      {/* Main Content */}
      <View style={styles.content}>{children}</View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>{continueText}</Text>
      </TouchableOpacity>


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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: responsiveFontSize(40),
    lineHeight: responsiveLineHeight(40, 50),
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
  continueBtn: {
    backgroundColor: Colors.light.primaryButton, // lime-like color
    borderRadius: 30,
    paddingVertical: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  continueText: {
    fontWeight: "600",
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 24),
    color: "#000",
  },
});
