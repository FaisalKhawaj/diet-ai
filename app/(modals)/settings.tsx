

import { User } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { responsiveHeight, responsiveWidth } from "@/utils";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";


export default function SettingsModal() {
  console.log("modals SettingsModal mounted");

    return(
      <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 16 }}>
      <Stack.Screen options={{ title: "Settings",headerShown:false }} />
      <View style={{flexGrow:1,backgroundColor:'#f5f5f5'}}>

     
    <View style={styles.topLine} />
    <Spacer marginTop={41} />

<Pressable style={styles.roundedImageView}>
  <Image source={User} style={{width:53,height:53,}} />
</Pressable>

<Spacer marginTop={36} />

<ThemedText style={{}}>Basic</ThemedText>
</View>
    </View>
    )
}

const styles=StyleSheet.create({
  topLine:{
    width:100,height:7,backgroundColor:'#EEEEEE',alignSelf:'center',
    marginTop:10,
  },
  roundedImageView:{
    width:responsiveWidth(123),
    height:responsiveHeight(123),
    borderRadius:123,justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    alignSelf:'center'
  }
})