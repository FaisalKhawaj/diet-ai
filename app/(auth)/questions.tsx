import { LimeSlider } from "@/components/limeslider";
import { OptionList } from "@/components/optionlist";
import { QuestionStep } from "@/components/QuestionStep";
import { RadioGroup, RadioOption } from "@/components/RadioGroup";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { ThemedText } from "@/components/themed-text";
import { WeightChart } from "@/components/weightchart";
import { Colors } from "@/constants/theme";
import { useStepper } from "@/context/stepper";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize } from "@/utils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type Gender = "male" | "female" | "other";

const activityOptions = [
  { id: "not_active", title: "Not Very Active", subtitle: "Little to no exercise" },
  { id: "light", title: "Light Active", subtitle: "A few workouts per month" },
  { id: "moderate", title: "Moderately Active", subtitle: "0-2 workouts per week" },
  { id: "very", title: "Very Active", subtitle: "2-4 workouts per week" },
  { id: "extra", title: "Extra Active", subtitle: "5+ workouts per week" },
];

  // Values are normalized 0..1 (top=1). These produce the same “crossing” look.
  const normalDiet = [0.72, 0.60, 0.45, 0.35, 0.40, 0.55, 0.75, 0.95];
  const calAI      = [0.85, 0.75, 0.55, 0.35, 0.18, 0.08, 0.03, 0.02];



export default function Questions() {
  const [gender, setGender] = useState<Gender | null>("male");
  const { next, prev, goTo, reset, total,setTotal, current, answers, setAnswer, canNext, setCanNext } = useStepper();
  const [age, setAge] = useState(30);

  console.log('current', current)
  const genderOptions: RadioOption<Gender>[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => setTotal(12), [setTotal]);

  return (
    <SafeAreaWrapper style={{ alignItems: 'flex-start' }}>
      {current === 0 &&
        <QuestionStep
          title="What is your Gender?"
          description="We ask to personalize your calorie and health insights"
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("gender", gender);
            next(); // ⬅️ moves to next question
          }}
          onBack={prev}
        >
          <RadioGroup
            value={gender}
            options={genderOptions}
            onChange={setGender}
            trackColor="#F4F4F4"
            ringColor={Colors.light.primaryButton}
            dotColor={Colors.light.primaryButton}
            itemHeight={66}
          />
        </QuestionStep>
      }

      {current === 1 &&
        <QuestionStep
          title="What is your Age?"
          description="Your age helps us tailor calorie goals to your needs"
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <View style={{ paddingHorizontal: 4 }}>
            <LimeSlider
              value={age}
              min={10}
              max={100}
              step={1}
              onChange={setAge}
              style={{ marginTop: 8 }}
              sliderHeight={8}
              thumbSize={22}
            />
            <ThemedText style={{  fontSize:responsiveFontSize(18),
              fontFamily:fonts.primary.primaryBold,
            }}>
              {age}
            </ThemedText>
          </View>
        </QuestionStep>
      }

      {current===2&&
         <QuestionStep
         title={`What is your Activity Level?`}
         description={`Choose your daily activity level to set accurate calorie goals.`}
         step={current + 1}
         totalSteps={total}
         onContinue={() => {
           setAnswer("age", age);
           next();
         }}
         onBack={prev}
       >
         <OptionList
      options={activityOptions}
      selectedId={answers[current]}
      onSelect={(id) => setAnswer(current, id)}
    />
        </QuestionStep>
      }

{current===3&&
         <QuestionStep
         title={`Cal AI gives you long term Results`}
         step={current + 1}
         totalSteps={total}
         onContinue={() => {
           setAnswer("age", age);
           next();
         }}
         onBack={prev}
       >
 <WeightChart
      style={{ width: 340 }}   // outer card width
      width={340}              // drawing area width
      height={180}
      normalDiet={normalDiet}
      calAI={calAI}
    />
    <ThemedText style={styles.weightLossDescription}>
      70% of Cat AI Users keep maintaining the weight loss even after a year
    </ThemedText>
        </QuestionStep>
}

    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
weightLossDescription:{
  fontFamily:fonts.secondary.secondaryRegular,
  textAlign:'center',
  paddingHorizontal:20,
  fontSize:responsiveFontSize(18)
}
})
