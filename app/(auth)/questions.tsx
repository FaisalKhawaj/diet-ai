import { QuestionStep } from "@/components/QuestionStep";
import { RadioGroup, RadioOption } from "@/components/RadioGroup";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet } from "react-native";

type Gender = "male" | "female" | "other";


export default function Questions() {
  const [gender, setGender] = useState<Gender | null>("male");

  const genderOptions: RadioOption<Gender>[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

  return (
<SafeAreaWrapper style={{alignItems:'flex-start'}}>

    
 



   
   <QuestionStep
  title="What is your Gender?"
  description="We ask to personalize your calorie and health insights"
  step={1}
  totalSteps={5}
  onContinue={() => console.log("Next")}
  onBack={() => console.log("Back")}
>

 <RadioGroup
          value={gender}
          options={genderOptions}
          onChange={setGender}
          // optional theming:
          trackColor="#F4F4F4"
          ringColor={Colors.light.primaryButton}
          dotColor={Colors.light.primaryButton}
          itemHeight={66}
        />
</QuestionStep>

{/* <QuestionStep
  title="What is your Age?"
  description="Your age helps us tailor calorie goals to your needs"
  step={2}
  totalSteps={5}
  onContinue={() => console.log("Next")}
  onBack={() => console.log("Back")}
>
  
</QuestionStep> */}


 


</SafeAreaWrapper>
  );
}

const styles=StyleSheet.create({
  backButton:{
backgroundColor:Colors.light.back,width:41,height:41,borderRadius:40,justifyContent:'center',alignItems:'center'
  }
})
