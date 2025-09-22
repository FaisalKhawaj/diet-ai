// app/diet-ai-screen.tsx
import { Carrot, Crown } from "@/assets/images";
import { Spacer } from "@/components/Spacer";
import { ThemedText } from "@/components/themed-text";
import { fonts } from "@/hooks/useCacheResources";
import { responsiveFontSize, responsiveLineHeight } from "@/utils";
import Feather from '@expo/vector-icons/Feather';
import { FlashList } from "@shopify/flash-list";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,

  Pressable,

  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G } from "react-native-svg";

const { width } = Dimensions.get("window");

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DATES = [24, 25, 26, 27, 28, 29, 30, 1];
const SELECTED = 24;


/* ===== Subcomponents ===== */
const NoFoodData=()=>{
  return(
    <View style={s.emptyCard}>
    <Text style={s.emptyTitle}>You haven't uploaded any data</Text>
    <Text style={s.emptySub}>
      Start Tracking by click on the add button{"\n"}below
    </Text>
  </View>
  )
}



function Macro({
  title,
  color,
  value,
  text,
}: {
  title: string;
  color: string;
  value: number; // 0..1
  text: string;
}) {
  return (
    <View style={{ flex: 1, gap: 6 }}>
      <View style={s.macroTitleRow}>
        <Text style={s.macroTitle}>{title}</Text>
      </View>
      <View style={s.track}>
        <View style={[s.trackFill, { width: `${Math.max(0, Math.min(1, value)) * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={s.macroSubValue}>{text}<ThemedText style={[s.macroSubValue,{color:'#696767'}]}>/200g</ThemedText> </Text>
    </View>
  );
}

function Donut({ value, labelTop, labelBottom }: { value: number; labelTop: string; labelBottom: string }) {
  const size = 120;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const dash = c * clamped;

  return (
    <View style={s.donutWrap}>
      <Svg width={size} height={size}>
        <G rotation={-90} originX={size / 2} originY={size / 2}>
          <Circle cx={size / 2} cy={size / 2} r={r} stroke="#EFEFEF" strokeWidth={stroke} fill="transparent" />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#F4A43E"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash}, ${c - dash}`}
            fill="transparent"
          />
        </G>
      </Svg>
      <View style={s.donutCenter}>
        <Text style={s.donutBig}>{labelTop}</Text>
        <Text style={s.donutSmall}>{labelBottom}</Text>
      </View>
    </View>
  );
}
const dished:any=[
  {
  id:11,
  dish:'Caser Salad Kit',
  status:'Serving',
  time:'2 Hours Ago',
},
{
  id:12,
  dish:'Scanned Food A',
  status:'Serving',
  time:'2 Hours Ago',
},
{
  id:13,
  dish:'Scanned',
  status:'Serving',
  time:'2 Hours Ago',
},
];

const ListHeader=()=>{
  return(
<Fragment>
  <View style={s.body}>


<View style={s.card}>

{/* Calories Edit Content */}
<View style={s.cardHeaderRow}>
 <View>
   <Text style={s.cardTitle}>
     Calories <Text>🔥</Text>
   </Text>
   <Text style={s.cardSub}>
     Goal: <Text style={s.cardSubGoal}>2256 Kcal</Text>
   </Text>
 </View>

 <Pressable style={s.iconBtn}>
 <Feather name="edit" size={20} color="black" />
 </Pressable>
</View>
 {/* Calories Edit Content Ends */}

{/* Calories */}
<View style={s.caloriesRow}>
 <View style={{ gap: 8 }}>
   <View>
     <ThemedText style={s.consumed}>Consumed</ThemedText>
     <Text style={s.monoBig}>2256<ThemedText style={s.cardSub}> Kcal</ThemedText> </Text>
   </View>

   <View>
     <ThemedText style={s.consumed}>Burned</ThemedText>
     <Text style={s.monoBig}>2256<ThemedText style={s.cardSub}> Kcal</ThemedText> </Text>
   </View>      

 </View>

 <Donut value={0.7} labelTop="2256" labelBottom="Kcal Left" />
</View>

{/* Macros */}
<View style={s.macrosRow}>
 <Macro title="Carbs 🌾" color="#2F80ED" value={0.4} text="10/ " />
 <Macro title="Protein 🐟" color="#27AE60" value={0.05} text="10 / " />
 <Macro title="Fat 🧀" color="#EB5757" value={0.05} text="10 / " />
</View>
</View>
     {/* Calories Card ends*/}
<Spacer marginTop={0} />
{/* Recently Logged */}
<Text style={s.cardTitle}>Recently Logged</Text>
</View>
</Fragment>
  )
}

const renderRecentLogged=({item}:any)=>{
  return(
    <Pressable style={s.recentLoggedMainWrapper}>
    {/* Image view */}
    <View style={s.recentLoggedDishImgView}>
      <Image source={{uri:'https://picsum.photos/200'}}
      style={s.recentLoggedDishImgStyle}
      contentFit='contain'
      />
    </View>
      {/* Image view */}
      <View style={{flex:1}}>
        <View style={s.recentLoggedRowBetween}>
        <ThemedText style={s.recentLoggedTimeAgo}>
          Serving
        </ThemedText>

        <ThemedText style={s.recentLoggedTimeAgo}>
          2 Hours
        </ThemedText>
        </View>
      
        <ThemedText style={s.recentLoggedDishName}>
        Caser Salad Kit 
        </ThemedText>

        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>

            <ThemedText style={s.recentLoggedCaloriAmount}> 
            🔥 225 Kcal
            </ThemedText>


            <ThemedText style={s.recentLoggedCaloriAmount}> 
            🌾 22g
            </ThemedText>


            <ThemedText style={s.recentLoggedCaloriAmount}> 
            🐟 25g
            </ThemedText>


            <ThemedText style={s.recentLoggedCaloriAmount}> 
            🧀 22g
            </ThemedText>
   
   
   
   
        </View>
      </View>

  </Pressable>
  )
}

export default function DietAIScreen() {
  
  const [loggedDish,setLoggedDish]=useState<any>([]);

  useEffect(()=>{
    setTimeout(() => {
      setLoggedDish(dished)
    }, 3000);
  },[])

  return (
    <SafeAreaView edges={['bottom']} style={s.root}>
      {/* Header gradient */}
      <LinearGradient
        colors={["#D1FE67", "#f3f9e6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={s.headerBg}
      >
        <View style={s.headerRow}>
          <Text style={s.brand}>
         
         <Image source={Carrot} style={{width:20,height:20}} />
           {' '} Cal AI
          </Text>

          <View style={s.proPill}>
            <Image source={Crown} style={{width:15,height:15}} />
      
            <Text style={s.proText}>Pro</Text>
          </View>
        </View>

        {/* Week strip */}
        <View style={s.weekWrap}>
          <View style={s.weekDayRow}>
            {DAYS.map((d,index) => (
              <Text key={`${d}-${index}`} style={s.weekDay}>
                {d}
              </Text>
            ))}
          </View>

          <View style={s.weekDateRow}>
            {DATES.map((d, i) => {
              const selected = d === SELECTED;
              return (
                <View
                  key={`${d}-${i}`}
                  style={[s.dateWrap, selected && s.dateSelected]}
                >
                  <Text style={[s.dateText, selected && s.dateTextSelected]}>
                    {d}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </LinearGradient>
           {/* Header gradient ends */}

      {/* Body */}

        {/* Calories Card */}
  
   
        
        <FlashList 
        data={loggedDish}
        ListEmptyComponent={NoFoodData}
        renderItem={renderRecentLogged}
        ListHeaderComponent={ListHeader}
        />
  

      {/* Bottom Tab Bar + FAB */}
      

     
    </SafeAreaView>
  );
}





/* ===== Styles ===== */

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  headerBg: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop:40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  brand: {
    fontSize: responsiveFontSize(25),
    lineHeight:responsiveLineHeight(25,30),
    fontWeight: "700",
    fontFamily:fonts.primary.primaryBold,
    
    color: "#0A0A0A",
  },
  proPill: {
    flexDirection: "row",
    alignItems: "center",
    gap:5,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 999,
  },
  proEmoji: { fontSize: 13, marginRight: 6 },
  proText: { color: "white", fontWeight: "700" },

  weekWrap: {
    marginTop: 14,
  },
  weekDayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  weekDay: {
    width: (width - 32 - 12) / 7, // 16px side padding + tiny slack
    textAlign: "center",
    color: "#8C8C8C",
    fontWeight: "600",
  },
  weekDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 2,
  },
  dateWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dateSelected: {
    backgroundColor: "#B7F24D",
  },
  consumed:{
    color:'#696767',
    fontFamily:fonts.secondary.secondaryRegular,
    fontSize:responsiveFontSize(14),lineHeight:responsiveLineHeight(14,18)
  },
  dateText: {
    color: "#111",
    fontWeight: "700",
  },
  dateTextSelected: {
    color: "#0A0A0A",
  },

  body: {
    padding: 16,
    gap: 12,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize:responsiveFontSize(22),
    lineHeight:responsiveLineHeight(22,26),
    fontWeight: "800",
    color: "#0A0A0A",
  },
  cardSub: {
 
    fontFamily:fonts.secondary.secondaryRegular,
    fontSize:responsiveFontSize(14),
    lineHeight:responsiveLineHeight(14,20),
    color: "#928D8D",
   
  },
  cardSubGoal: { color: "#80B404",
    
    fontSize:responsiveFontSize(14),
    lineHeight:responsiveLineHeight(14,20), },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 42,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  caloriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  monoBig: { fontSize: responsiveFontSize(20),lineHeight:responsiveLineHeight(20,25),
    fontFamily:fonts.primary.primaryBold,
     color: "#0A0A0A" 
    },
  muted: { color: "#8D8D8D", fontWeight: "600" },

  donutWrap: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  donutCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  donutBig: { fontSize:responsiveFontSize(24),fontFamily:fonts.primary.primaryBold, color: "#1A1A1A" },
  donutSmall: { fontSize: 12,fontFamily:fonts.secondary.secondaryRegular,
     color: "#696767", marginTop: 2 },

  macrosRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  macroTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  macroTitle: {fontSize:responsiveFontSize(14),fontFamily:fonts.secondary.secondaryRegular, color: "#000000" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  track: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#EDEDED",
    overflow: "hidden",
  },
  trackFill: {
    height: 6,
    borderRadius: 999,
  },
  macroSubValue: { color: "#000000", fontWeight: "800", marginTop: 2, fontSize: 12 },

  sectionTitle: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "800",
    color: "#0A0A0A",
  },

  emptyCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  emptyTitle: {
    fontSize:responsiveFontSize(20),
    lineHeight:responsiveLineHeight(20,30),
    fontFamily:fonts.primary.primaryBold,
    color: "#000",
  },
  emptySub: {
    textAlign: "center",
    color: "#696767",
    fontFamily:fonts.secondary.secondaryRegular,
    fontSize:responsiveFontSize(16),
    lineHeight:responsiveLineHeight(16,22),
  },
  recentLoggedMainWrapper:{
    marginHorizontal:20,
    borderWidth:1,borderColor:'#EBEBEB',
backgroundColor:'#fff',
borderRadius:20,
padding:17,
gap:10,
flexDirection:'row',
  },
recentLoggedDishImgView:{
  width:60,
  height:60,
  borderRadius:10,
},
recentLoggedDishImgStyle:{
  width:'100%',
              borderRadius:10,
              height:'100%'
},
recentLoggedRowBetween:{
  flexDirection:'row',justifyContent:'space-between'
},
recentLoggedTimeAgo:{
  fontFamily:fonts.secondary.secondaryRegular,
  fontSize:responsiveFontSize(12),
  lineHeight:responsiveLineHeight(12,18),
  color:'#696767'
},
recentLoggedDishName:{
  fontFamily:fonts.primary.primaryBold,
  fontSize:responsiveFontSize(18),
  lineHeight:responsiveLineHeight(18,24),
  color:'#000000'
},
recentLoggedCaloriAmount:{
  fontSize:responsiveFontSize(12),
  lineHeight:responsiveLineHeight(12,18),
  fontFamily:fonts.secondary.secondaryRegular
}

 
});
