import { ProgressBar } from "@/components/ProgressBar";
import { SafeAreaWrapper } from "@/components/SafeAreaWrapper";
import { Spacer } from "@/components/Spacer";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Questions() {
  return (
<SafeAreaWrapper style={{alignItems:'flex-start'}}>

      <Pressable style={styles.backButton}>
        <Ionicons name='chevron-back' size={20} color={'#000'} />
      </Pressable>
     <Spacer marginTop={30} />

      <ProgressBar value={4} max={60} />
   

 


</SafeAreaWrapper>
  );
}

const styles=StyleSheet.create({
  backButton:{
backgroundColor:Colors.light.back,width:41,height:41,borderRadius:40,justifyContent:'center',alignItems:'center'
  }
})
