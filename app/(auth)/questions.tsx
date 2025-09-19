import { LimeSlider } from "@/components/limeslider";
import { QuestionStep } from "@/components/QuestionStep";
import { RadioGroup, RadioOption } from "@/components/RadioGroup";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useStepper } from "@/context/stepper";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize } from "@/utils";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type Gender = "male" | "female" | "other";


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
          step={2}
          totalSteps={12}
          onContinue={() => console.log("Next")}
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

    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.light.back, width: 41, height: 41, borderRadius: 40, justifyContent: 'center', alignItems: 'center'
  }
})
