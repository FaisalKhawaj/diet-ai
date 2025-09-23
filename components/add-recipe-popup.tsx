import { Colors } from "@/constants/theme";
import { useRecipe } from "@/context/recipecontext";
import { useStepper } from "@/context/stepper";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { CheckboxGroup } from "./checkbox";
import { RadioGroup } from "./RadioGroup";
import { ReceipeStep } from "./ReceipeStep";
import { Spacer } from "./Spacer";
import { ThemedText } from "./themed-text";

const cookingCategories = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Snacks & Sides", value: "snacks_sides" },
  { label: "Desserts", value: "desserts" },
  { label: "Soups & Stews", value: "soups_stews" },
  { label: "Baked Goods", value: "baked_goods" },
  { label: "Beverages", value: "beverages" },
];

const dietaryRestrictions = [
  { label: "Standard", value: "standard" },
  { label: "Vegeterian", value: "vegeterian" },
  { label: "Vegan", value: "vegan" },
  { label: "Keto", value: "keto" },
  { label: "Mediterranean", value: "mediterranean" },
];

const servingPrepare = [
  { label: "1 Servings", value: "1-serving" },
  { label: "2 Servings", value: "2-serving" },
  { label: "3 Servings", value: "3-serving" },
  { label: "4 Servings", value: "4-serving" },
  { label: "5 Servings", value: "5-serving" },
];

const cookingTimes = [
  { label: "Less than 15 minutes", value: "Less than 15 minutes" },
  { label: "15-30 minutes", value: "15-30 minutes" },
  { label: "Flexible", value: "Flexible" },
];

const kitchenEquipments = [
  { label: "Stove/Oven", value: "Stove/Oven" },
  { label: "Microwave", value: "Microwave" },
  { label: "Blender", value: "Blender" },
  { label: "Air Fryer", value: "Air Fryer" },
  { label: "Slow Cooker/Instant Pot", value: "Slow Cooker/Instant Pot" },
  {
    label: "Simple Kitchen Equipment Only",
    value: "Simple Kitchen Equipment Only",
  },
];

export default function AddRecipePopup() {
  const { setShowAddRecipe } = useRecipe();
  const { next, prev, current, total, setTotal, setType, type } = useStepper();
  const [cook, setCook] = useState("");
  const [dietary, setDietary] = useState("");
  const [preparingServing, setPreparingServing] = useState("");
  const [timeCook, setTimeCook] = useState("");

  const [equipKitchen, setEquipKitchen] = useState<string[]>([]);

  useEffect(() => {
    setType("receipe");
    setTotal(7);
  }, [setType, setTotal]);

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "timing",
        duration: 200,
        delay: 0,
      }}
      style={styles.mainWrapper}
    >
      <MotiView
        from={{
          translateX: 300,
        }}
        animate={{
          translateX: 0,
        }}
        exit={{
          translateX: 300,
        }}
        transition={{
          type: "timing",
          duration: 250,
          delay: 0,
        }}
        style={styles.innerWrap}
      >
        {/* Header */}
        {/* <View style={[globalStyles.row, { alignItems: "center" }]}>
          <Pressable
            style={globalStyles.overflowBackButton}
            onPress={() => {
              setShowAddRecipe(false);
              router.push("/(tabs)");
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#000" />
          </Pressable>
          <ThemedText style={globalStyles.screenCenterHeaderTitle}>
            Recipe AI
          </ThemedText>
        </View> */}
        {/* Header Ends*/}

        {current === 0 && (
          <ReceipeStep
            title={`What do you want to cook?`}
            step={current + 1}
            totalSteps={total}
            onContinue={() => {
              // setAnswer("age", age);
              next();
            }}
            onBack={prev}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <RadioGroup
                value={cook}
                options={cookingCategories}
                onChange={setCook}
                trackColor="#F4F4F4"
                ringColor={Colors.light.primaryButton}
                dotColor={Colors.light.primaryButton}
                itemHeight={66}
              />
            </ScrollView>
          </ReceipeStep>
        )}

        {current === 1 && (
          <ReceipeStep
            title={`Do you have any dietary restrictions?`}
            step={current + 1}
            totalSteps={total}
            onContinue={() => {
              // setAnswer("age", age);
              next();
            }}
            onBack={prev}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <RadioGroup
                value={dietary}
                options={dietaryRestrictions}
                onChange={setDietary}
                trackColor="#F4F4F4"
                ringColor={Colors.light.primaryButton}
                dotColor={Colors.light.primaryButton}
                itemHeight={66}
              />
            </ScrollView>
          </ReceipeStep>
        )}

        {current === 2 && (
          <ReceipeStep
            title={`How many servings would you like to prepare?`}
            step={current + 1}
            totalSteps={total}
            onContinue={() => {
              // setAnswer("age", age);
              next();
            }}
            onBack={prev}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <RadioGroup
                value={preparingServing}
                options={servingPrepare}
                onChange={setPreparingServing}
                trackColor="#F4F4F4"
                ringColor={Colors.light.primaryButton}
                dotColor={Colors.light.primaryButton}
                itemHeight={66}
              />
            </ScrollView>
          </ReceipeStep>
        )}

        {current === 3 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if you have a header
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <ReceipeStep
                title={`Do you want to include or exclude any specific ingredients?`}
                step={current + 1}
                totalSteps={total}
                onContinue={() => {
                  // setAnswer("age", age);
                  next();
                }}
                onBack={prev}
              >
                <ThemedText style={styles.inputLabel}>Include</ThemedText>
                <Spacer marginTop={10} />
                <TextInput
                  placeholder="Type Here"
                  placeholderTextColor={Colors.light.inputPlaceholder}
                  style={styles.inputFieldStyle}
                />

                <Spacer marginTop={20} />
                <ThemedText style={styles.inputLabel}>Exclude</ThemedText>

                <Spacer marginTop={10} />
                <TextInput
                  placeholder="Type Here"
                  placeholderTextColor={Colors.light.inputPlaceholder}
                  style={styles.inputFieldStyle}
                />

                <Spacer marginTop={20} />
              </ReceipeStep>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {current === 4 && (
          <ReceipeStep
            title={`How much time do you have to cook this dish?`}
            step={current + 1}
            totalSteps={total}
            onContinue={() => {
              // setAnswer("age", age);
              next();
            }}
            onBack={prev}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <RadioGroup
                value={timeCook}
                options={cookingTimes}
                onChange={setTimeCook}
                trackColor="#F4F4F4"
                ringColor={Colors.light.primaryButton}
                dotColor={Colors.light.primaryButton}
                itemHeight={66}
              />
            </ScrollView>
          </ReceipeStep>
        )}

        {current === 5 && (
          <ReceipeStep
            title={`What Kitchen equipment do you have available? `}
            step={current + 1}
            totalSteps={total}
            onContinue={() => {
              // setAnswer("age", age);
              next();
            }}
            onBack={prev}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
              <CheckboxGroup
                values={equipKitchen}
                options={kitchenEquipments}
                onChange={setEquipKitchen}
                trackColor="#F4F4F4"
                checkColor={Colors.light.activeDot}
                // itemHeight={66}
              />
            </ScrollView>
          </ReceipeStep>
        )}

        {current === 6 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if you have a header
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 40,
                minWidth: "100%",
              }}
            >
              <ReceipeStep
                title={`Targeted Macros`}
                description="(Optional)"
                step={current + 1}
                totalSteps={total}
                containerStyle={{
                  flex: 1,
                }}
                onContinue={() => {
                  // setAnswer("age", age);
                  next();
                }}
                onBack={prev}
              >
                <View style={styles.rowTargetCarb}>
                  <ThemedText style={styles.targetCarb}>🔥</ThemedText>
                  <TextInput
                    style={[styles.inputFieldStyle, { width: "50%" }]}
                  />
                  <ThemedText style={styles.targetCarb}>Cal</ThemedText>
                </View>
                <Spacer marginTop={10} />

                <View style={styles.rowTargetCarb}>
                  <ThemedText style={styles.targetCarb}>🌾</ThemedText>
                  <TextInput
                    style={[styles.inputFieldStyle, { width: "50%" }]}
                  />
                  <ThemedText style={styles.targetCarb}>g Carbs</ThemedText>
                </View>

                <Spacer marginTop={10} />
                <View style={styles.rowTargetCarb}>
                  <ThemedText style={styles.targetCarb}>🐟</ThemedText>
                  <TextInput
                    style={[styles.inputFieldStyle, { width: "50%" }]}
                  />
                  <ThemedText style={styles.targetCarb}>g protein</ThemedText>
                </View>

                <Spacer marginTop={10} />
                <View style={styles.rowTargetCarb}>
                  <ThemedText style={styles.targetCarb}>🧀</ThemedText>
                  <TextInput
                    style={[styles.inputFieldStyle, { width: "50%" }]}
                  />
                  <ThemedText style={styles.targetCarb}>g fats</ThemedText>
                </View>
              </ReceipeStep>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    zIndex: 9,
    position: "absolute",
    left: 0,
    top: 0,
    marginTop: 0,
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.2,
    backgroundColor: Colors.light.background,
  },
  innerWrap: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    zIndex: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenCenterHeaderTitle: {
    flex: 1,
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(25),
    lineHeight: responsiveLineHeight(25, 30),
    textAlign: "center",
  },
  inputLabel: {
    fontFamily: fonts.primary.primaryBold,
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveLineHeight(18, 22),
  },
  inputFieldStyle: {
    backgroundColor: Colors.light.inputBg,
    padding: 17,
    fontFamily: fonts.secondary.secondaryMedium,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 22),
    borderRadius: 40,
  },
  rowTargetCarb: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  targetCarb: {
    fontFamily: fonts.secondary.secondaryRegular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveLineHeight(16, 20),
    color: Colors.light.description,
  },
});
