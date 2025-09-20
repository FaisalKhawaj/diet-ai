import { ComparisonMiniChart } from "@/components/ComparisonMiniChart";
import { HeightRulerPicker } from "@/components/heightrulepicker";
import { IntervalSlider } from "@/components/IntervalSlider";
import { LimeSlider } from "@/components/limeslider";
import { OptionList } from "@/components/optionlist";
import { QuestionStep } from "@/components/QuestionStep";
import { RadioGroup, RadioOption } from "@/components/RadioGroup";
import { RulerPicker } from "@/components/rulerpicker";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { SegmentedPills } from "@/components/segmentpill";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { WeightChart } from "@/components/weightchart";
import { Colors } from "@/constants/theme";
import { useStepper } from "@/context/stepper";
import { cmToFt, cmToIn, ftToCm, inToCm, Unit } from "@/helpers/measurement";
import { kgToLbs, kgToOz, lbsToKg, ozToKg, WeightUnit } from "@/helpers/weightunits";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

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
const calAI = [0.85, 0.75, 0.55, 0.35, 0.18, 0.08, 0.03, 0.02];




export default function Questions() {
  const [gender, setGender] = useState<Gender | null>("male");
  const [goal, setGoal] = useState('');
  const { next, prev, goTo, reset, total, setTotal, current, answers,isLast, setAnswer, canNext, setCanNext } = useStepper();
  const [age, setAge] = useState(30);
  const [unit, setUnit] = useState<Unit>("cm");
  const [weight, setWeight] = useState<any>('kg');
  const [cmValue, setCmValue] = useState<any>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [kgValue, setKgValue] = useState<number>(70);           // canonical weight
  const [weightDisplay, setWeightDisplay] = useState<string>("");
const [preferredDiet,setPreferredDiet]=useState('');
const preferDiets=[
  { label: "Standard", value: "standard" },
  { label: "Vegeterian", value: "vegeterian" },
  { label: "Vegan", value: "vegan" },
  { label: "Keto", value: "keto" },
  { label: "Mediterranean", value: "mediterranean" },
]

  const config = useMemo(() => {
    switch (unit) {
      case "ft":
        return {
          min: 3.0,
          max: 8.0,
          initial: cmToFt(cmValue),
          step: 1 / 12,             // ✅ one inch per step (NOT 0.01)
          formatter: (v: number) => {
            const totalInches = Math.round(v * 12);
            const feet = Math.floor(totalInches / 12);
            const inches = totalInches % 12;
            return `${feet}'${inches}"`;
          },
          toCm: ftToCm,
        };
      case "in":
        return {
          min: cmToIn(120),
          max: cmToIn(220),
          initial: cmToIn(cmValue),
          step: 1,
          formatter: (v: number) => `${Math.round(v)} in`,
          toCm: inToCm,
        };
      case "cm":
      default:
        return {
          min: 120,
          max: 220,
          initial: cmValue,
          step: 1,
          formatter: (v: number) => `${v} cm`,
          toCm: (v: number) => v,
        };
    }
  }, [unit, cmValue]);


  const weightCfg = useMemo(() => {
    const minKg = 30, maxKg = 200;

    switch (weightUnit) {
      case "lbs": {
        const step = 1;
        return {
          unit: "lb",
          min: Math.round(kgToLbs(minKg)),
          max: Math.round(kgToLbs(maxKg)),
          step,
          fractionDigits: 0,
          fromKg: (kg: number) => kgToLbs(kg),
          toKg: (v: number) => lbsToKg(v),
          fmt: (v: number) => `${Math.round(v)} lb`,
          majorEverySteps: 10,  // every 10 lb
          midEverySteps: 5,   // every 5 lb
        };
      }
      case "ounce": {
        const step = 1;
        return {
          unit: "oz",
          min: Math.round(kgToOz(minKg)),
          max: Math.round(kgToOz(maxKg)),
          step,
          fractionDigits: 0,
          fromKg: (kg: number) => kgToOz(kg),
          toKg: (v: number) => ozToKg(v),
          fmt: (v: number) => `${Math.round(v)} oz`,
          majorEverySteps: 16,  // every 16 oz (1 lb)
          midEverySteps: 8,   // every 8 oz (half lb)
        };
      }
      case "grams": {
        const step = 100;
        return {
          unit: "g",
          min: minKg * 1000,
          max: maxKg * 1000,
          step,
          fractionDigits: 0,
          fromKg: (kg: number) => kg * 1000,
          toKg: (v: number) => v / 1000,
          fmt: (v: number) => `${Math.round(v)} g`,
          majorEverySteps: 10,  // 10*100g = 1000g
          midEverySteps: 5,   // 5*100g  = 500g
        };
      }
      case "kg":
      default: {
        const step = 0.5;
        return {
          unit: "kg",
          min: minKg,
          max: maxKg,
          step,
          fractionDigits: 1,
          fromKg: (kg: number) => kg,
          toKg: (v: number) => v,
          fmt: (v: number) => `${v.toFixed(1)} kg`,
          majorEverySteps: 20,  // 20*0.5 = 10 kg
          midEverySteps: 10,  // 10*0.5 = 5 kg
        };
      }
    }
  }, [weightUnit])

  const handleChange = (pickerValue: number) => {
    const cm = Math.round(config.toCm(pickerValue));
    setCmValue(cm);
    // onChangeCm?.(cm);
  };
  const [display, setDisplay] = useState<any>(null);


  console.log('current', current)
  const genderOptions: RadioOption<Gender>[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const [targetTimeGoal, setTargetTimeGoal] = useState<"1w" | "3m" | "6m">("1w");


  const goals = [
    { label: "Lose Weight", value: "lose_weight" },
    { label: "Gain Weight", value: "gain_weight" },
    { label: "Maintain", value: "maintain" },
  ]

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
            <ThemedText style={{
              fontSize: responsiveFontSize(18),
              fontFamily: fonts.primary.primaryBold,
            }}>
              {age}
            </ThemedText>
          </View>
        </QuestionStep>
      }

      {current === 2 &&
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

      {current === 3 &&
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
          <View style={{alignSelf:'center'}}>
          <WeightChart
            style={{ width: 340 }}   // outer card width
            width={320}              // drawing area width
            height={180}
            normalDiet={normalDiet}
            calAI={calAI}
          />
          </View>
        
          <Spacer marginTop={30} />
          <ThemedText style={styles.weightLossDescription}>
            70% of Cat AI Users keep maintaining the weight loss even after a year
          </ThemedText>
        </QuestionStep>
      }

      {current === 4 &&
        <QuestionStep
          title={`What is your Current Height?`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <SegmentedPills
            options={[
              { id: "cm", label: "Cm" },
              { id: "ft", label: "Foot" },
              { id: "in", label: "Inches" },
            ]}
            style={{ justifyContent: 'center' }}
            value={unit}
            onChange={(id) => setUnit(id as Unit)}
          />

          <HeightRulerPicker
            min={config.min}
            max={config.max}
            initial={config.initial}
            step={config.step}
            unitLabel={unit as "cm" | "in" | "ft"}
            formatter={config.formatter}
            onChange={(v) => setDisplay(config.formatter(v))}
            onChangeEnd={(v) => setCmValue(Math.round(config.toCm(v)))}
            accent="#D9FF48"
          />

        </QuestionStep>
      }

      {current === 5 &&
        <QuestionStep
          title={`What is your Current Weight?`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <SegmentedPills
            options={[
              { id: "ounce", label: "Ounce" },
              { id: "grams", label: "Grams" },
              { id: "lbs", label: "LBS" },
              { id: "kg", label: "KG" },
            ]}
            style={{ justifyContent: 'center' }}
            value={weightUnit}
            onChange={(id) => setWeightUnit(id as WeightUnit)}
          />
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <RulerPicker
              key={`${weightUnit}-${weightCfg.min}-${weightCfg.max}-${weightCfg.step}`} // force correct remount per unit
              width={Dimensions.get("window").width - 48}
              height={120}
              min={weightCfg.min}
              max={weightCfg.max}
              step={weightCfg.step}
              initialValue={weightCfg.fromKg(kgValue)}
              fractionDigits={weightCfg.fractionDigits}
              unit={weightCfg.unit}
              indicatorHeight={80}
              indicatorColor="black"
              valueTextStyle={{ fontSize: 28, fontWeight: "800" }}
              unitTextStyle={{ fontSize: 20 }}
              onValueChange={(val) => setWeightDisplay(`${val} ${weightCfg.unit}`)}
              onValueChangeEnd={(val) => {
                const num = parseFloat(val);
                // round to the unit’s resolution when storing back to kg
                const kg = Math.round(weightCfg.toKg(num) * 10) / 10;
                setKgValue(kg);
              }}
              majorEverySteps={weightCfg.majorEverySteps} // e.g., 10 for lb, 16 for oz, 20 for kg(0.5)
              midEverySteps={weightCfg.midEverySteps}
            />
          </View>


        </QuestionStep>
      }


      {current === 6 &&
        <QuestionStep
          title={`What is your Goal?`}
          description={`Choose what you want to achieve`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <RadioGroup
            value={goal}
            options={goals}
            onChange={setGoal}
            trackColor="#F4F4F4"
            ringColor={Colors.light.primaryButton}
            dotColor={Colors.light.primaryButton}
            itemHeight={66}
          />
        </QuestionStep>
      }

{current === 7 &&
        <QuestionStep
          title={`Your target Weight`}
          description={`Tell us your goal weight to personalize your plan`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <RulerPicker
              key={`${weightUnit}-${weightCfg.min}-${weightCfg.max}-${weightCfg.step}`} // force correct remount per unit
              width={Dimensions.get("window").width - 48}
              height={120}
              min={weightCfg.min}
              max={weightCfg.max}
              step={weightCfg.step}
              initialValue={weightCfg.fromKg(kgValue)}
              fractionDigits={weightCfg.fractionDigits}
              unit={weightCfg.unit}
              indicatorHeight={80}
              indicatorColor="black"
              valueTextStyle={{ fontSize: 28, fontWeight: "800" }}
              unitTextStyle={{ fontSize: 20 }}
              onValueChange={(val) => setWeightDisplay(`${val} ${weightCfg.unit}`)}
              onValueChangeEnd={(val) => {
                const num = parseFloat(val);
                // round to the unit’s resolution when storing back to kg
                const kg = Math.round(weightCfg.toKg(num) * 10) / 10;
                setKgValue(kg);
              }}
              majorEverySteps={weightCfg.majorEverySteps} // e.g., 10 for lb, 16 for oz, 20 for kg(0.5)
              midEverySteps={weightCfg.midEverySteps}
            />
          </View>
          </QuestionStep>
          }

{current === 8 &&
        <QuestionStep
        renderTitle={()=><ThemedText style={styles.wrapperTitleStyle}>A <ThemedText style={[styles.wrapperTitleStyle,{
          color:'#FDC565'
        }]}>2KG </ThemedText>gain is a steady,acheivable milestone </ThemedText>}

          description={`89% of Cal AI users says that the results they got are inevitable. We believe you can do it too.`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <ThemedText></ThemedText>
          </QuestionStep>}


          {current === 9 &&
        <QuestionStep
        title={`Target time for your Goal`}
       

          description={`Set how quickly you’d like to reach your goal.`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
        <IntervalSlider
  value={targetTimeGoal}                 // or omit "value" and use defaultValue
  onChange={setTargetTimeGoal}
  activeColor="#D9FF48"
  trackColor="#E5E5E5"
  style={{ paddingHorizontal: 16 }}
/>

          </QuestionStep>}

          {current === 10 &&
        <QuestionStep
        title={`Twice more likely`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
          <ComparisonMiniChart
          leftLabel={`without\nDiet AI`}
          leftValueText="20%" rightValueText="2x" />
          <Spacer marginTop={40} />
<ThemedText style={styles.description}>
Diet AI helps you achieve results faster, better, and longer lasting
</ThemedText>
          </QuestionStep>
}

{current === 11 &&
        <QuestionStep
        title={`Do you have a preferred diet Type?`}
          step={current + 1}
          totalSteps={total}
          onContinue={() => {
            setAnswer("age", age);
            next();
          }}
          onBack={prev}
        >
 <RadioGroup
            value={preferredDiet}
            options={preferDiets}
            onChange={setPreferredDiet}
            trackColor="#F4F4F4"
            ringColor={Colors.light.primaryButton}
            dotColor={Colors.light.primaryButton}
            itemHeight={66}
          />
          </QuestionStep>
          }

    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  weightLossDescription: {
    fontFamily: fonts.secondary.secondaryRegular,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: responsiveFontSize(18)
  },
  wrapperTitleStyle:{
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
})
